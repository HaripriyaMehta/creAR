
i = 0
dicty1 = {}
allpaths = []
with open("/Users/haripriyamehta/Documents/creAR/textfiles/new-file") as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
for x in range(len(content)):
    if x%3 == 0:
        dicty1[i] = content[x].strip().replace("==> ", "").replace(' <==', "").replace(".txt", "")
        i+=1
    elif x%3 == 1:
        allpaths.append(content[x].strip())

print(dicty1)
print(allpaths)

f = open('/Users/haripriyamehta/Documents/creAR/textfiles/allpaths','w')
f.write(str(allpaths))
f.close()





