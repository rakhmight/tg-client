export function genPseudoRandomID(): string {
    const chrs:string = 'ABCDEFGHKLMONPQRSTVWXYZ0123456789'
    let str: string = ''
    for (let i = 0; i < 16; i++) {
        const pos = Math.floor(Math.random() * chrs.length)
        str += chrs.substring(pos,pos+1)
    }
    
    return `${Date.now()}${str}`
}