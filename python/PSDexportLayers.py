#  PSDLayerExporter

# Copyright (c) 2016 Under the Weather, LLC
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software
# and associated documentation files (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies
# or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
# PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
# FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
# ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import os
import sys
import subprocess
import string

class PSDLayerExporter:
    def process(self, argv):
        print("Layer exporter")

        if len(argv) < 2:
            print('No file specified.')
            return

        self.inputFile = argv[1]

        out = subprocess.check_output('PSDLayerInfo.py ' + self.inputFile, shell=True)

        layers = out.split('\n')

        index = 0

        for layer in layers:
            index += 1   
            if layer and (layer.find("base") is not -1 or layer.find("detail") is not -1):
                print("layer: " + layer)
                self.export_layer(index, layer)

    def export_layer(self, psdIndex, layer_name):

        extractedFilename = ""
        extIndex = self.inputFile.rfind(".psd")
        if extIndex is not -1:
            extractedFilename = self.inputFile[:extIndex]

        extractedFilename += "_" + layer_name + ".png"
        cmd = self.inputFile + "[0] " + self.inputFile + "[" + str(psdIndex) + "] ( -clone 0 -alpha transparent ) -swap 0 +delete -coalesce -compose src-over -composite " + extractedFilename;

        commandStr = 'convert ' + cmd

        subprocess.call(commandStr, shell=True)
        
def main():
    argv = sys.argv
    layer_exporter = PSDLayerExporter()
    layer_exporter.process(argv)
    

if __name__ == "__main__":
    main()