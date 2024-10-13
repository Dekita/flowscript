
export default async function logExecutingNodeData(node, {inputValues}) {
    console.log(`Executing Node: [${node.label}]`, inputValues);
}