import { Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Link } from "./link";
import { StackLayout } from "ui/layouts/stack-layout";

export class ListViewLinksdModel extends Observable {

    private _links: Array<Link>;
    private _actionBarTitle: string;

    constructor(links: Array<Link>) {
        super();

        this.links = links;
        this.actionBarTitle = "";
    }

    get links(): Array<Link> {
        return this._links;
    }

    set links(value: Array<Link>) {

        value.sort((a, b) => {
            let titleA = a.title.toUpperCase();
            let titleB = b.title.toUpperCase();
            return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
        });

        if (this._links !== value) {
            this._links = value;
            this.notifyPropertyChange("links", value);
        }
    }

    get actionBarTitle(): string {
        return this._actionBarTitle;
    }

    set actionBarTitle(value: string) {

        if (this._actionBarTitle !== value) {
            this._actionBarTitle = value;
            this.notifyPropertyChange("actionBarTitle", value);
        }
    }

    onItemTap(args: ItemEventData) {
        const linkItem = this.links[args.index];

        topmost().navigate({
            moduleName: linkItem.link,
            context: { "title": linkItem.title }
        });
    }
}
