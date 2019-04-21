namespace BLST.Views {
    export const Home: preact.FunctionalComponent<Props> =
        props => {
            return (
                <div class="view-home">
                    <Components.GameList games={Data.games} />
                    <Components.RenderJson data={props} />
                </div>
            );
        };

    interface Props extends preactRouter.RoutableProps {

    }
}