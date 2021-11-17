export type PropertyDictionary = { [name: string]: any }

export function GetAllPropertiesFromClass(instance: any) {
    var propNames = Object.getOwnPropertyNames(instance)
    var dic: PropertyDictionary[] = []
    propNames.forEach(prop => {
        dic[prop] = instance[prop]
    })
    return dic
}