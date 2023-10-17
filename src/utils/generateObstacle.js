export const generateObstale = (nOfCells) =>{
    const obstacleContainer = []
    let maxObstacles = 2
    

    while (maxObstacles > 0) {

        //creates a row - column index
        const x = Math.floor(Math.random() * nOfCells)
        const y = Math.floor(Math.random() * nOfCells)

        //if index are already inside the container skip the current iteration, else push the index inside the container and decrease the counter
        if (obstacleContainer.some(element => element?.x === x && element?.y === y)) continue;
        obstacleContainer.push({ x, y })
        maxObstacles -= 1;

    }
    return obstacleContainer;

}