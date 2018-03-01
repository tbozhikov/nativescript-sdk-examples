// tslint:disable:max-line-length
// >> application-events-import
import {
    on as applicationOn, off as applicationOff, android as androidApp, ios as iOSApp,
    launchEvent, suspendEvent, resumeEvent, exitEvent,
    displayedEvent, lowMemoryEvent, uncaughtErrorEvent, orientationChangedEvent,
    ApplicationEventData, UnhandledErrorEventData, LaunchEventData, OrientationChangedEventData
} from "tns-core-modules/application";
// << application-events-import
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { DeviceOrientation } from "ui/enums";
let vm;
let launchListener,
    suspendListener,
    resumeListener,
    exitListener,
    displayedListener,
    lowMemoryListener,
    orientationChangedListener,
    uncaughtErrorListener;

export function onNavigatingTo(args) {
    const page = <Page>args.object;
    page.actionBar.title = "";
}

export function onNavigatedTo(args) {
    const page = <Page>args.object;

    vm = new Observable();
    vm.set("actionBarTitle", args.context.actionBarTitle);
    vm.set("info", "Refer to the code-behind files \nfor Application Events snippets");

    if (androidApp) {
        let activity = androidApp.foregroundActivity;
        let orientationEnum = activity.getResources().getConfiguration().orientation;
        vm.set("orientation", (orientationEnum === 1 ? DeviceOrientation.portrait : DeviceOrientation.landscape));
    } else if (iOSApp) {
        vm.set("orientation", DeviceOrientation.portrait);
    }

    page.bindingContext = vm;
}

export function onGridLoaded(args) {
    // >> application-events
    launchListener = applicationOn(launchEvent, (args: LaunchEventData) => {
        // The root view for this Window on iOS or Activity for Android.
        // If not set a new Frame will be created as a root view in order to maintain backwards compatibility.
        console.log("Root View: " + args.root);
        console.log("The appication was launched!");
    });

    suspendListener = applicationOn(suspendEvent, (args: ApplicationEventData) => {
        console.log("The appication was suspended!");
    });

    resumeListener = applicationOn(resumeEvent, (args: ApplicationEventData) => {
        console.log("The appication was resumed!");
    });

    exitListener = applicationOn(exitEvent, (args: ApplicationEventData) => {
        console.log("The appication was closed!");
    });

    displayedListener = applicationOn(displayedEvent, (args: ApplicationEventData) => {
        console.log("NativeScript displayedEvent");
    });

    lowMemoryListener = applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
        // the instance that has raidsed the event
        console.log("Instance: " + args.object);
    });

    orientationChangedListener = applicationOn(orientationChangedEvent, (args: OrientationChangedEventData) => {
        // orientationChangedEventData.newValue: "portrait" | "landscape" | "unknown"
        console.log("Orientation: " + args.newValue);
        vm.set("orientation", args.newValue);
    });

    uncaughtErrorListener = applicationOn(uncaughtErrorEvent, (args: UnhandledErrorEventData) => {
        // UnhandledErrorEventData.error: NativeScriptError
        console.log("NativeScript Error: " + args.error);
    });
    // << application-events
}

export function onGridUnloaded() {
    // >> application-events-off
    // import { off as applicationOff } from "tns-core-modules/applicaiton";
    applicationOff(launchEvent, launchListener);
    applicationOff(resumeEvent, resumeListener);
    applicationOff(suspendEvent, suspendListener);
    applicationOff(exitEvent, exitListener);
    applicationOff(displayedEvent, displayedListener);
    applicationOff(lowMemoryEvent, lowMemoryListener);
    applicationOff(orientationChangedEvent, orientationChangedListener);
    applicationOff(uncaughtErrorEvent, uncaughtErrorListener);
    // << application-events-off
}
