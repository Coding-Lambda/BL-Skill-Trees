namespace BLST {
    class App extends preact.Component<unknown, unknown> {

        public render(): JSX.Element {
            const {
                Router,
                Route,
            } = preactRouter;

            return (
                <div class="preact-app">
                    <preactRouter.Router>
                        <Views.Home path={createRootedPath("/")} />
                        <Views.GameInfo path={createRootedPath("/:gameId")} />
                        <Views.ClassInfo path={createRootedPath("/:gameId/:className")} />
                        <Route default component={() => <h1>404</h1>} />
                    </preactRouter.Router>
                </div>
            );
        }
    }

    function adjustStartUpUrlIfNeeded(): void {
        let startUpUrlParam = location.search
            .slice(1) // remove leading "?"
            .split("&")
            .map(parts => parts
                .split("=")
                .map(decodeURIComponent) as [string, string]
            )
            .filter(pair => stringEqualsIgnoreCase(pair[0], "startUpUrl"));

        if (startUpUrlParam.length > 0) {
            let startUpUrl = startUpUrlParam[0][1];
            history.replaceState({}, document.title, startUpUrl);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        adjustStartUpUrlIfNeeded();

        let preactRoot = document.querySelector(".preact-root");

        if (preactRoot == null)
            throw new Error("Missing preact root");

        preact.render(<App />, preactRoot);
    });
}