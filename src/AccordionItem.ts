import { AbstractWraplet } from "wraplet";
import { Groupable, GroupExtractor } from "./Groupable";
import { itemAttribute } from "./selectors";
import { Storage, ElementStorage } from "wraplet/storage";

export type AccordionItemOptions = {
  groupAttribute?: string;
  openClass?: string;
};

export default class AccordionItem
  extends AbstractWraplet<{}, Element>
  implements Groupable
{
  private options: Storage<Required<AccordionItemOptions>>;

  private groupExtractorCallback: GroupExtractor = (element: Element) =>
    element.getAttribute(this.options.get("groupAttribute"));

  constructor(element: Element, options: AccordionItemOptions = {}) {
    super(element);

    const isString = (value: unknown): value is string =>
      typeof value === "string";

    const validators: Record<
      keyof AccordionItemOptions,
      (value: unknown) => boolean
    > = {
      groupAttribute: isString,
      openClass: isString,
    };

    const defaultOptions: Required<AccordionItemOptions> = {
      groupAttribute: "data-group",
      openClass: "open",
    };

    this.options = new ElementStorage<Required<AccordionItemOptions>>(
      element,
      itemAttribute,
      validators,
      { ...defaultOptions, ...options },
    );
  }

  public setGroupExtractor(callback: GroupExtractor): void {
    this.groupExtractorCallback = callback;
  }

  public getGroup(): string | null {
    return this.groupExtractorCallback(this.node);
  }

  /**
   * Open accordion item.
   */
  public open(): void {
    this.node.classList.add(this.options.get("openClass"));
  }

  /**
   * Close accordion item.
   */
  public close(): void {
    this.node.classList.remove(this.options.get("openClass"));
  }

  /**
   * Toggle accordion item.
   */
  public toggle(): void {
    this.node.classList.toggle(this.options.get("openClass"));
  }

  /**
   * Check if the accordion item is open.
   */
  public isOpen(): boolean {
    return this.node.classList.contains(this.options.get("openClass"));
  }

  protected defineChildrenMap(): {} {
    return {};
  }
}
