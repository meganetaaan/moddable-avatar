declare class MDNS {
  constructor(
    dictionary: {
      hostName?: string;
    },
    callback?: (message: number, value: any) => void
  );
  monitor(
    serviceType: string,
    callback: (service: string, instance: Service) => void
  ): void;
  add(service: Service): void;
  update(service: Service): void;
  remove(service: Service): void;
  remove(serviceType: string): void;
  services: Service[];
}
declare interface Service {
  name: string;
  protocol: string;
  port: number;
  txt: string;
}
export = MDNS;
