namespace BLST.Components {
    export const GameList: preact.FunctionalComponent<Props> =
        ({ games }) => (
            <ol class="component-game-list">
                {games.map(game =>
                    <li>
                        <a href={createRootedPath(`/${game.id}`)}>
                            {game.name}
                        </a>
                    </li>
                )}
            </ol>
        );

    interface Props {
        games: Data.GameInfo[];
    }
}