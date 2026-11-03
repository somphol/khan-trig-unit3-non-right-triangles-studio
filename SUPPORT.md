# Support

## Before you ask

Most questions are answered in the docs:

| Question | Read |
| -------- | ---- |
| How do I run or deploy it? | [README](README.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| How is the app built? | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Why does SSA produce two triangles? | [docs/DESIGN.md](docs/DESIGN.md) |
| How do I verify a change? | [docs/TESTING.md](docs/TESTING.md) |
| What accessibility support exists? | [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) |
| How do I contribute? | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Where is progress stored? | [README § Data and privacy](README.md#data-and-privacy) |

## Common fixes

- **Progress disappeared.** Data is per browser profile and per origin. Private
  windows, clearing site data and switching between `file://` and `http://`
  origins each start fresh.
- **SSA shows no triangle.** That is a valid result: when `a < b sin A` (or both
  candidate angles B leave C ≤ 0) no triangle exists. Try a larger `a` or a
  smaller `A`.
- **Only one triangle appears.** The second candidate `B` often makes
  `C = 180° − A − B` zero or negative; only one orientation survives.
- **SSS warning appears.** The three sides violate the triangle inequality
  (`a + b > c`, `a + c > b`, `b + c > a`).
- **The solution steps stay hidden.** Press the show-steps button once; the
  animation reveals three steps over about two seconds.
- **Export does nothing.** Some browsers block multiple downloads or require a
  user gesture; try again from the button and check the download shelf.

## Opening an issue

Use the bug report or feature request template. Include module, slider values,
expected and actual behaviour, browser/OS, interface language, and console output.

Security issues must follow [SECURITY.md](SECURITY.md), not the public tracker.

## Scope and expectations

Maintenance is best effort by a single volunteer. There is no guaranteed
response time, SLA, or support for modified forks. Well-scoped reports with
reproduction steps are prioritised.
