/*
 * Copyright (c) 2016-2017  Moddable Tech, Inc.
 *
 *   This file is part of the Moddable SDK.
 *
 *   This work is licensed under the
 *       Creative Commons Attribution 4.0 International License.
 *   To view a copy of this license, visit
 *       <http://creativecommons.org/licenses/by/4.0>.
 *   or send a letter to Creative Commons, PO Box 1866,
 *   Mountain View, CA 94042, USA.
 *
 */

import { Request } from "http";
import Net from "net";
import Timer from "timer";
import WiFi from "wifi";

function wait(ms: number) {
  return new Promise(resolve => Timer.set(resolve, ms));
}

function resolve(domain: string) {
  return new Promise((resolve, reject) => {
    Net.resolve(domain, (name, address) => {
      if (address) resolve(address);
      else reject();
    });
  });
}

function fetch(host: string, path = "/") {
  return new Promise<string>((resolve, reject) => {
    let request = new Request({ host, path, response: String });
    request.callback = function(message, value) {
      if (5 === message) resolve(value);
      else if (message < 0) reject(-1);
    };
  });
}

function scan(dictionary = {}) {
  return new Promise<string[]>((resolve, reject) => {
    let result: string[] = [];
    WiFi.scan(dictionary, item => {
      if (!item) resolve(result);
      else if (!result.find(value => item.ssid == value) && item.ssid != null)
        result.push(item.ssid);
    });
  });
}

scan().then((result: any[]) => result.forEach(name => trace(name, "\n")));

resolve("moddable.tech")
  .then(address => trace(`resolved to ${address}\n`))
  .catch(() => trace("cannot resolve\n"));

wait(3000).then(() => {
  fetch("www.example.com")
    .then(body => trace(body, "\n"))
    .catch(error => trace("http get failed\n"));
});
