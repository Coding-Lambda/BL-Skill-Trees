namespace BLST.Components {
    export const RenderJson: preact.FunctionalComponent<Props> = ({ data }) => (
        <pre class="component-print-as-json">
            {JSON.stringify(data, null, 4)}
        </pre>
    );

    interface Props {
        data: any;
    }
}