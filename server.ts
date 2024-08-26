import app from './src/app';

console.log('reached at server.ts')
// const PORT: number = parseInt(process.env.PORT || '4000', 10);
const PORT = 4010; //process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
