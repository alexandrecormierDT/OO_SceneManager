@echo off
P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -format '%%[EXIF:ImageDescription*]' %1 | find /v "''exif" | find "'exif" > %2
type %2