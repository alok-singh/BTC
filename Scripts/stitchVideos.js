let videoStitch = require('video-stitch');
let videoConcat = videoStitch.concat;
let files = ['hls-720p1.ts', 'hls-720p2.ts', 'hls-720p3.ts', 'hls-720p4.ts', 'hls-720p5.ts', 'hls-720p6.ts', 'hls-720p7.ts', 'hls-720p8.ts', 'hls-720p9.ts', 'hls-720p10.ts', 'hls-720p11.ts', 'hls-720p12.ts', 'hls-720p13.ts', 'hls-720p14.ts', 'hls-720p15.ts', 'hls-720p16.ts', 'hls-720p17.ts', 'hls-720p18.ts', 'hls-720p19.ts', 'hls-720p20.ts', 'hls-720p21.ts', 'hls-720p22.ts', 'hls-720p23.ts', 'hls-720p24.ts', 'hls-720p25.ts', 'hls-720p26.ts', 'hls-720p27.ts', 'hls-720p28.ts', 'hls-720p29.ts', 'hls-720p30.ts', 'hls-720p31.ts', 'hls-720p32.ts', 'hls-720p33.ts', 'hls-720p34.ts', 'hls-720p35.ts', 'hls-720p36.ts'];
let path = require('path');
let outputFile = path.resolve(__dirname, "./sequalise/all.ts");
files = files.map(name => {return {fileName: path.resolve(__dirname, './sequalise/' + name)}});

console.log(files);
console.log(outputFile);

videoConcat({
    silent: false, // optional. if set to false, gives detailed output on console
    overwrite: false // optional. by default, if file already exists, ffmpeg will ask for overwriting in console and that pause the process. if set to true, it will force overwriting. if set to false it will prevent overwriting.
})
.clips(files)
.output(outputFile) //optional absolute file name for output file
.concat()
.then((outputFileName) => {
    console.log(outputFileName);
}, error => {
    console.log(error);
})