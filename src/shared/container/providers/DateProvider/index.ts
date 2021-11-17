import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementantions/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);
