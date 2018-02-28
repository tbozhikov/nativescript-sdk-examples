import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { ListViewLinksdModel } from "./links-view-model";
import { Link } from "./link";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    let vm = new ListViewLinksdModel();
    vm.set("links", navigationLinks);

    page.bindingContext = vm;
}

export const navigationLinks = [
    new Link("ActionBar", "/action-bar"),
    new Link("ActivityIndicator", "/activity-indicator"),
    new Link("Animations", "/animations"),
    new Link("Button", "/button"),
    new Link("DatePicker", "/date-picker"),
    new Link("Dialogs", "/dialogs"),
    new Link("Layouts", "/layouts"),
    new Link("TimePicker", "/time-picker"),
    new Link("ScrollView", "/scroll-view"),
    new Link("SearchBar", "/search-bar"),
    new Link("SegmentedBar", "/segmented-bar"),
    new Link("Slider", "/slider"),
    new Link("Switch", "/switch"),
    new Link("TabView", "/tab-view"),
    new Link("TextField", "/text-field"),
    new Link("TextView", "/text-view"),
    new Link("WebView", "/web-view"),
    new Link("Style", "/style"),
    new Link("Gestures", "/gestures"),
    new Link("HtmlView", "/html-view"),
    new Link("Image", "/image"),
    new Link("Label", "/label"),
    new Link("ListPicker", "/list-picker"),
    new Link("ListView", "/list-view"),
    new Link("Progress", "/progress"),
    new Link("Formatted String", "/formatted-string"),
    new Link("Trace Module", "/trace"),
    new Link("Timer Module", "/timer"),
    new Link("Platform Module", "/platform"),
    new Link("Location", "/location"),
    new Link("FPS Meter", "/fps-meter"),
    new Link("HTTP Module", "/http"),
    new Link("Application", "/application"),
    new Link("Application Settings", "/application-settings"),
    new Link("Color", "/color"),
    new Link("Connectivity", "/connectivity"),
    new Link("File System", "/file-system"),
    new Link("Modal page", "/modal-page"),
    new Link("Camera", "/camera")
];
