import { EventData, Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Page } from "tns-core-modules/ui/page";
import { ListViewLinksdModel } from "../links-view-model";
import { Link } from "../link";

const navigationLinks: Array<Link> = [
    new Link("Check Platform", "/application/check-platform/check-platform-page"),
    new Link("Application Events", "/application/application-events/application-events-page"),
    new Link("Android Broadcast Receiver", "/application/android-broadcast-receiver/android-broadcast-receiver-page"),
    new Link("iOS Notification Observer", "/application/ios-notification-observer/ios-notification-observer-page")
];

export function onNavigatingTo(args) {
    let page = <Page>args.object;
    console.log("onNavigatingTo: title: " + args.context.title);
    page.bindingContext = new ListViewLinksdModel(navigationLinks);
    page.bindingContext.actionBarTitle = args.context.title;
}
