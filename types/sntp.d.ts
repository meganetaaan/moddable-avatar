declare class SNTP {
  constructor(
    dictionary: {
      host: string;
    },
    callback: (message: number, value: string | number | null) => void
  );
}
export = SNTP;
