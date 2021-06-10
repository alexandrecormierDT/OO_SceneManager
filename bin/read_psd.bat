P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -verbose -format "label:%l,geometry:%g\n" %1
P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe convert -dispose Background %1 -layers coalesce "layers\%l.png"
