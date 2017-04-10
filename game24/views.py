import json
from django.shortcuts import render
from django.http import HttpResponse
import itertools

def index(request):
    return render(request, 'game24/index.html')

def rules(request):
    return render(request, 'game24/rules.html')

def game24(a):
    for p in itertools.permutations(a):
        signs = ['+', '-', '*', '/']
        br = ("((%s.0 %s %s.0) %s %s.0) %s %s.0",
              "(%s.0 %s %s.0) %s (%s.0 %s %s.0)",
              "(%s.0 %s (%s.0 %s %s.0)) %s %s.0",
              "%s.0 %s ((%s.0 %s %s.0) %s %s.0)",
              "%s.0 %s (%s.0 %s (%s.0 %s %s.0))")
        for s1 in signs:
            for s2 in signs:
                for s3 in signs:
                    for b in br:
                        str = b % (p[0], s1, p[1], s2, p[2], s3, p[3])
                        try:
                            result = eval(str)
                        except:
                            pass
                        else: 
                            if result == 24:
                                return str.replace(".0", "")


def solve(request):
    cards = request.GET["cards"].split(",")
    cards_int = [int(c) for c in cards] 
    solution = game24(cards_int)
    return HttpResponse(solution or "No solution")