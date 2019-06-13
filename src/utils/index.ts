export default class Util {

  public static getMapKeyByValue (map: any, value: string): string[] {
    return Object.keys(map).filter((key: string) => {
      return value.indexOf(map[key]) > -1
    })
  }
}