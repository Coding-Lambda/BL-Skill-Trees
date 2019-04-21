namespace BLST.Components {
    export const ClassList: preact.FunctionalComponent<Props> =
        ({ game }) => (
            <ol class="component-game-list">
                {game.classes.map(classInfo =>
                    <li>
                        <a href={createRootedPath(`/${game.id}/${classInfo.className}`)}>
                            {classInfo.characterName}
                            <br />
                            {classInfo.className}
                        </a>
                    </li>
                )}
            </ol>
        );

    interface Props {
        game: Data.GameInfo;
    }
}