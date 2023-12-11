import { randomUUID } from "crypto"


export class DatabaseMemory{
    #atores = new Map()

list(search){
    return Array.from(this.#atores.entries()).map((atorArray) => {
        const id = atorArray[0]

        const data = atorArray[1]
        
        return{
            id,
            ...data,
        }
    }) 

    .filter(ator => {
        if (search) {
    return ator.modelo.includes(search)
    }
        return true
    })
}

    create(ator){
        const atorId = randomUUID()
        this.#atores.set(atorId, ator)
    }
    
    update(id, ator){
        this.#atores.set(id, ator)
    }

    delete(id, ator){
        this.#atores.delete(id, ator)
    }
}
