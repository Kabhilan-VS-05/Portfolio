"""Collect coding stats for the portfolio and write stats.json and stats.js.

Sources (all public):
  GitHub       REST API for profile and repos, GraphQL for the contribution calendar
  LeetCode     GraphQL endpoint
  GeeksforGeeks  public profile API used by the profile page

If one source fails, its previous values are kept so the page never breaks.
Run locally:  python scripts/update_stats.py   (set GITHUB_TOKEN for the heatmap)
"""
import datetime
import json
import os
import urllib.request

GITHUB_USER = "Kabhilan-VS-05"
LEETCODE_USER = "KABHILAN_VS"
GFG_USER = "kabhilanvs"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "Mozilla/5.0 (portfolio-stats-updater)"


def request(url, data=None, headers=None):
    h = {"User-Agent": UA, "Accept": "application/json"}
    h.update(headers or {})
    body = json.dumps(data).encode() if data is not None else None
    if body is not None:
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=h)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def github():
    token = os.environ.get("GITHUB_TOKEN", "")
    auth = {"Authorization": "Bearer " + token} if token else {}
    user = request("https://api.github.com/users/" + GITHUB_USER, headers=auth)
    repos = request(
        "https://api.github.com/users/%s/repos?per_page=100&type=owner" % GITHUB_USER, headers=auth
    )
    langs = {}
    for r in repos:
        if not r.get("fork") and r.get("language"):
            langs[r["language"]] = langs.get(r["language"], 0) + 1
    total = sum(langs.values()) or 1
    top = sorted(langs.items(), key=lambda kv: -kv[1])[:5]
    out = {
        "repos": user["public_repos"],
        "followers": user["followers"],
        "languages": [{"name": n, "count": c, "pct": round(100 * c / total)} for n, c in top],
        "stars": sum(r.get("stargazers_count", 0) for r in repos),
    }
    if token:
        query = """query($login:String!){user(login:$login){contributionsCollection{
          contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}"""
        res = request(
            "https://api.github.com/graphql",
            {"query": query, "variables": {"login": GITHUB_USER}},
            auth,
        )
        cal = res["data"]["user"]["contributionsCollection"]["contributionCalendar"]
        out["contributions"] = cal["totalContributions"]
        out["calendar"] = [
            [d["contributionCount"] for d in w["contributionDays"]] for w in cal["weeks"]
        ]
        out["calendar_start"] = cal["weeks"][0]["contributionDays"][0]["date"]
    return out


def leetcode():
    query = """query($u:String!){matchedUser(username:$u){
      submitStatsGlobal{acSubmissionNum{difficulty count}}
      userCalendar{streak totalActiveDays}
      profile{ranking}}}"""
    res = request(
        "https://leetcode.com/graphql",
        {"query": query, "variables": {"u": LEETCODE_USER}},
        {"Referer": "https://leetcode.com/u/" + LEETCODE_USER + "/"},
    )
    m = res["data"]["matchedUser"]
    counts = {x["difficulty"]: x["count"] for x in m["submitStatsGlobal"]["acSubmissionNum"]}
    return {
        "solved": counts.get("All", 0),
        "easy": counts.get("Easy", 0),
        "medium": counts.get("Medium", 0),
        "hard": counts.get("Hard", 0),
        "streak": m["userCalendar"]["streak"],
        "active_days": m["userCalendar"]["totalActiveDays"],
        "ranking": m["profile"]["ranking"],
    }


def gfg():
    res = request(
        "https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=%s&article_count=false&redirect=true"
        % GFG_USER
    )
    d = res["data"]
    return {
        "solved": d["total_problems_solved"],
        "score": d["score"],
        "institute_rank": d["institute_rank"],
        "institute": d["institute_name"],
        "longest_streak": d["pod_solved_longest_streak"],
    }


def main():
    path = os.path.join(ROOT, "stats.json")
    try:
        with open(path, encoding="utf-8") as f:
            stats = json.load(f)
    except (OSError, ValueError):
        stats = {}
    for key, fn in (("github", github), ("leetcode", leetcode), ("gfg", gfg)):
        try:
            new = fn()
            if key == "github":
                old = stats.get("github", {})
                for k in ("contributions", "calendar", "calendar_start"):
                    if k not in new and k in old:
                        new[k] = old[k]
            stats[key] = new
            print("ok  ", key)
        except Exception as exc:  # keep old values on any failure
            print("skip", key, "-", exc)
    stats["updated"] = datetime.date.today().isoformat()
    with open(path, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=1)
    with open(os.path.join(ROOT, "stats.js"), "w", encoding="utf-8") as f:
        f.write("window.STATS = " + json.dumps(stats) + ";\n")


if __name__ == "__main__":
    main()
