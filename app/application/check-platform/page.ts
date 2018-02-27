// >> application-import-ts
import * as application from "tns-core-modules/application";
// << application-import-ts
import { EventData } from "tns-core-modules/data/observable";

export function onGridLoaded(args: EventData) {
    // >> application-platform-ts
    if (application.android) {
        console.log("We are running on Android device!");
    } else if (application.ios) {
        console.log("We are running on iOS device");
    }
    // << application-platform-ts
}
