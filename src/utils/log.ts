export function timestamp_log(message: string): void {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`)
}