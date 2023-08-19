import { createPopper, Instance } from "@popperjs/core";
import { Component } from "../../base-types/component";
import { Toolbar } from "../ToolbarComponent";
import { Components } from "../../core";
import { SimpleUIComponent } from "../SimpleUIComponent";

export type IContainerPosition = "top" | "right" | "bottom" | "left";

type IContainerAlingment = "start" | "center" | "end";

interface IContainers {
  [key: string]: HTMLDivElement;
}

type mouseEvents = "mouseup" | "mousedown" | "mousemove" | "contextmenu";

/**
 * A component that handles all UI components.
 */
export class UIManager extends Component<Toolbar[]> {
  name: string = "UIManager";
  enabled: boolean = true;
  toolbars: Toolbar[] = [];
  contextMenu: Toolbar;

  tooltipsEnabled = true;

  children: SimpleUIComponent[] = [];

  private _components: Components;
  private _contextMenuContainer: HTMLDivElement;
  private _mouseMoved = false;
  private _mouseDown = false;
  private _popperInstance: Instance;

  private _containers: IContainers = {
    top: document.createElement("div"),
    right: document.createElement("div"),
    bottom: document.createElement("div"),
    left: document.createElement("div"),
  };

  private _events: {
    mouseup: (e: any) => void;
    mousedown: (e: any) => void;
    mousemove: (e: any) => void;
    contextmenu: (e: any) => void;
  };

  // TODO: Does this need to be here?
  static Class = {
    Label: "block leading-6 text-gray-400 text-sm",
  };

  get viewerContainer() {
    return this._components.renderer.get().domElement
      .parentElement as HTMLElement;
  }

  constructor(components: Components) {
    super();
    this._components = components;

    this.contextMenu = new Toolbar(components);
    this.contextMenu.setDirection("vertical");
    this.contextMenu.position = "left";

    this._contextMenuContainer = document.createElement("div");
    this._contextMenuContainer.style.position = "absolute";
    this._contextMenuContainer.append(this.contextMenu.domElement);

    this._popperInstance = createPopper(
      this._contextMenuContainer,
      this.contextMenu.domElement,
      {
        placement: "bottom-start",
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: Object.values(this._containers),
            },
          },
        ],
      }
    );

    const containerClasses: Record<string, string[]> = {
      top: ["top-0", "pt-4"],
      right: ["top-0", "right-0", "pr-4"],
      bottom: ["bottom-0", "pb-4"],
      left: ["top-0", "left-0", "pl-4"],
    };

    for (const id in this._containers) {
      const container = this._containers[id];
      container.className =
        "absolute flex gap-y-3 gap-x-3 pointer-events-none p-4";
      container.classList.add(...containerClasses[id]);
      container.id = `${id}-toolbar-container`;
      this.setContainerAlignment(id as IContainerPosition, "center");
    }

    const hContainerClass = ["flex-row", "w-full"];
    const vContainerClass = ["flex-column", "h-full"];
    this._containers.top.classList.add(...hContainerClass);
    this._containers.right.classList.add(...vContainerClass);
    this._containers.bottom.classList.add(...hContainerClass);
    this._containers.left.classList.add(...vContainerClass);

    this._events = {
      mousedown: this.onMouseDown,
      mouseup: this.onMouseUp,
      mousemove: this.onMouseMoved,
      contextmenu: this.onContextMenu,
    };
  }

  get() {
    return this.toolbars;
  }

  dispose() {
    this.setupEvents(false);
    for (const name in this._containers) {
      const element = this._containers[name];
      element.remove();
    }
    for (const toolbar of this.toolbars) {
      toolbar.dispose();
    }
    for (const child of this.children) {
      child.dispose();
    }
    this.children = [];
    this.contextMenu.dispose();
    this._containers = {};
    this._contextMenuContainer.remove();
    (this._components as any) = null;
    (this.contextMenu as any) = null;
    (this._contextMenuContainer as any) = null;
  }

  init() {
    this.setupEvents(true);

    this.viewerContainer.append(
      this._containers.top,
      this._containers.right,
      this._containers.bottom,
      this._containers.left,
      this._contextMenuContainer
    );
  }

  add(...uiComponents: SimpleUIComponent[]) {
    for (const component of uiComponents) {
      this.children.push(component);
      this.viewerContainer.append(component.domElement);
    }
  }

  closeMenus() {
    this.toolbars.forEach((toolbar) => toolbar.closeMenus());
    this.contextMenu.closeMenus();
  }

  setContainerAlignment(
    container: IContainerPosition,
    alingment: IContainerAlingment
  ) {
    this._containers[container].style.justifyContent = alingment;
    this._containers[container].style.alignItems = alingment;
  }

  addToolbar(...toolbar: Toolbar[]) {
    toolbar.forEach((tlbr) => {
      const container = this._containers[tlbr.position];
      if (!container) {
        return;
      }
      container.append(tlbr.domElement);
      this.toolbars.push(tlbr);
    });
    this.updateToolbars();
  }

  updateToolbars() {
    this.toolbars.forEach((toolbar) => {
      toolbar.visible = true;
      toolbar.updateElements();
      if (toolbar.position === "bottom" || toolbar.position === "top") {
        toolbar.setDirection("horizontal");
      } else {
        toolbar.setDirection("vertical");
      }
    });
  }

  private setupEvents(active: boolean) {
    for (const name in this._events) {
      const event = this._events[name as mouseEvents];
      if (active) {
        this.viewerContainer.addEventListener(name, event);
      } else {
        this.viewerContainer.removeEventListener(name, event);
      }
    }
  }

  private onMouseUp = (_event: MouseEvent) => {
    this._mouseDown = false;
  };

  private onMouseMoved = (_event: MouseEvent) => {
    if (this._mouseDown) {
      this._mouseMoved = true;
    }
  };

  private onMouseDown = (event: MouseEvent) => {
    this._mouseDown = true;
    const canvas = this._components.renderer.get().domElement;
    if (event.target === canvas) {
      this.closeMenus();
      this.contextMenu.visible = false;
    }
  };

  private onContextMenu = (event: MouseEvent) => {
    if (this._mouseMoved) {
      this._mouseMoved = false;
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    this.closeMenus();
    this._contextMenuContainer.style.left = `${event.offsetX}px`;
    this._contextMenuContainer.style.top = `${event.offsetY}px`;
    this.contextMenu.visible = true;
    this._popperInstance.update();
  };
}
