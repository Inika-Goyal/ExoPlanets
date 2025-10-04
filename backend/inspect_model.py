lines=open('model.py','r',encoding='utf-8').read().splitlines()
for i in range(224,242):
    print(i,repr(lines[i-1]))
