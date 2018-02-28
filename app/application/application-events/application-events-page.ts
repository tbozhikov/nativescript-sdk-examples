// tslint:disable:max-line-length
import {
    on as applicationOn,
    displayedEvent, launchEvent, suspendEvent, resumeEvent, exitEvent,
    lowMemoryEvent, uncaughtErrorEvent, orientationChangedEvent,
    ApplicationEventData, UnhandledErrorEventData, LaunchEventData, OrientationChangedEventData
} from "tns-core-modules/application";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

export function onNavigatingTo(args) {
    let page = <Page>args.object;
    page.actionBar.title = "";
}

export function onNavigatedTo(args) {
    let page = <Page>args.object;

    let vm = new Observable();
    vm.set("actionBarTitle", args.context.actionBarTitle);

    page.bindingContext = vm;
}

export function onGridLoaded(args) {
    // >> application-events
    applicationOn(launchEvent, (args: LaunchEventData) => {
        // The root view for this Window on iOS or Activity for Android.
        // If not set a new Frame will be created as a root view in order to maintain backwards compatibility.
        console.log("Root View: " + args.root);
        console.log("The appication was launched!");
    });

    applicationOn(suspendEvent, (args: ApplicationEventData) => {
        console.log("The appication was suspended!");
    });

    applicationOn(resumeEvent, (args: ApplicationEventData) => {
        console.log("The appication was resumed!");
    });

    applicationOn(exitEvent, (args: ApplicationEventData) => {
        console.log("The appication was closed!");
    });

    applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
        // the instance that has raidsed the event
        console.log("Instance: " + args.object);
    });

    applicationOn(orientationChangedEvent, (args: OrientationChangedEventData) => {
        // orientationChangedEventData.newValue: "portrait" | "landscape" | "unknown"
        console.log("Orientation: " + args.newValue);
    });

    applicationOn(uncaughtErrorEvent, (args: UnhandledErrorEventData) => {
        // UnhandledErrorEventData.error: NativeScriptError
        console.log("NativeScript Error: " + args.error);
    });
    // << application-events
}
