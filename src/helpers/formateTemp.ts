
export const formatTempenture = (temperature: number): number => {
    const kelvin = 273.15
    const result = parseInt((temperature - kelvin).toString())
    return result

}