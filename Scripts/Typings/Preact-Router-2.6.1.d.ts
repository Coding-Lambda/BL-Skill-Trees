declare namespace preactRouter {
    function route(url: string, replace?: boolean): boolean;
    function route(options: { url: string; replace?: boolean }): boolean;

    function getCurrentUrl(): string;

    interface Location {
        pathname: string;
        search: string;
    }

    interface CustomHistory {
        listen(callback: (location: Location) => void): () => void;
        location: Location;
        push(path: string): void;
        replace(path: string): void;
    }

    interface RoutableProps {
        path?: string;
        default?: boolean;
    }

    interface RouterOnChangeArgs {
        router: Router;
        url: string;
        previous?: string;
        active: preact.VNode[];
        current: preact.VNode;
    }

    interface RouterProps extends RoutableProps {
        history?: CustomHistory;
        static?: boolean;
        url?: string;
        onChange?: (args: RouterOnChangeArgs) => void;
    }

    class Router extends preact.Component<RouterProps, {}> {
        canRoute(url: string): boolean;
        getMatchingChildren(
            children: preact.VNode[],
            url: string,
            invoke: boolean
        ): preact.VNode[];
        routeTo(url: string): boolean;
        render(props: RouterProps, { }): preact.VNode;
    }

    const subscribers: Array<(url: string) => void>

    type AnyComponent<Props> =
        | preact.FunctionalComponent<Props>
        | preact.ComponentConstructor<Props, any>;

    interface RouteProps<Props> extends RoutableProps {
        component: AnyComponent<Props>;
    }

    function Route<Props>(
        props: RouteProps<Props> & Partial<Props>
    ): preact.VNode;

    function Link(props: { activeClassName?: string } & JSX.HTMLAttributes): preact.VNode;
}