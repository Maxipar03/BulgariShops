// Manejo de consultas

export const logger = (req,res,next) => {
console.log(`[${req.method}] - ${req.url} - ${new Date()}`);
next();
}