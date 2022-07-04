const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) +((y1 - y2), 2));
}

const hashAirports = (airports) => {
    let hashAirport = {};

    airports.forEach(airport => {
        hashAirport[airport['Airport ID']] = {
            ...airport
        }
    });
    
    return hashAirport;
};

const buildGraph = (airports) => {
    let graph = {};
    let hashAirport = hashAirports(airports);
    console.log("Hash***", hashAirport)
    console.log("Hash", hashAirport[2518])
    if(hashAirport[2518]) {
        console.log("ENTROOOOOOOOOU")
        airports.forEach(airport => {
            airport['destinations'].forEach(destination => {
                if(hashAirport[2518]) {
                    graph[airport['Airport ID']] = {
                        ...graph[airport['Airport ID']],
                        [destination]: distance(
                            hashAirport[destination]?hashAirport[destination]['Latitude']:0,
                            hashAirport[destination]?hashAirport[destination]['Longitude']: 0,
                            airport['Latitude'],
                            airport['Longitude'],
                        )
                    }
                }
            });
        });
    }
    console.log("Grafo****",graph)
    return graph;
}

export default buildGraph;
export { buildGraph, hashAirports };