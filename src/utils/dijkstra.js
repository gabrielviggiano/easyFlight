import { buildGraph } from './buildGraph';
import { PriorityQueue } from './priorityQueue';


const path = (parent, end) => {
    let xs = [];
    let previous = end;

    while(previous !== -1) {
        xs.unshift(previous);
        previous = parent[previous];
    }

    return xs;
}

// function that returns the minimum cost and path to reach Finish
const dijkstra = (airports, start, end) => {

    const graph = buildGraph(airports);
    console.log("Graph****", graph)

    // Distance
    let dist = {};

    // Path
    let parent = {};
    console.log("Aeroportos****", airports)
    airports.forEach(airport => {
        dist[airport['Airport ID']] = Infinity;
    })


    let priorityQueue = new PriorityQueue(); 
    
    priorityQueue.enqueue(start, 0); 
    dist[start] = 0;
    parent[start] = -1;
    console.log("Queue", priorityQueue)
    while(!priorityQueue.isEmpty()) {
        
        let u = priorityQueue.front().element
        console.log("u", u)
        console.log("Teste", graph[u])

        priorityQueue.dequeue();
        if(u && graph) {
            console.log("graph2***", graph)
            Object.entries(graph[u]).forEach(([key, value]) => {
              
                let v = key;
                let w = value;

                if(dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    parent[v] = u;
                    priorityQueue.enqueue(v, dist[v]);
                }
            });
        }
    }
    
    return path(parent, end);

};

export default dijkstra;
export { dijkstra };