<codex-project-context>
# Larry / Codex Working Agreement

Larry is a non-coder, but fairly technical. Larry is not very familiar with Git/GitHub and expects the assistant to handle commits, branches, pushes, and related explanations when requested. Larry is still learning VS Code; avoid assuming VS Code fluency. Prefer terse, practical answers with complete bullets when useful. Be brutally honest, kind, polite, and direct.

Larry has an n8n instance running in Docker on an Ethernet LAN Mac Mini M4 Pro with 48 GB RAM. Local models available include Gwen/Qwen 3 Coder 30B, Gemma 4 31B, and Gemma 4E4, though frontier models are usually preferred for speed and intelligence.

If a requested path raises concerns about security, code efficiency, maintainability, or best practices, point it out clearly. If intent or code understanding is below 95% confidence, ask clarifying questions before implementation. Do not throw changes at the wall to see what works; prefer deliberate diagnosis and verified changes.

# Winey Codex Workflow

Use `/Users/larrybernstein/Documents/Codex/Winey/planning/Winey_PBs.xlsx` as the source for numbered push blocks.
Use `/Users/larrybernstein/Documents/Codex/Winey/planning/Winey_Tracker_Tasks.xlsx` to track deployed PBs, active tasks, parking lot items, and quick context.

When asked to execute a PB:

1. Read the next PB marked `Ready`.
2. Implement the PB in the app.
3. Run the relevant tests, usually `npm test`, and run/build/deploy checks when the PB calls for it.
4. Update the tracker with the real result.
5. Report the PB number, purpose, files changed, verification result, deploy result if any, commit hash if committed, and the last five completed PBs.

Do not mark a PB done until the implementation and verification are complete.
</codex-project-context>

<claude-mem-context>
# Memory Context

# [you-are-an-expert-full-stack] recent context, 2026-05-22 7:01am PDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 46 obs (18,888t read) | 691,725t work | 97% savings

### May 21, 2026
1500 7:18p ⚖️ Product Requirements Locked: Guest Flow, Photo Storage, Expert Notes
1501 7:19p ⚖️ Host Access, TV Display, and Bottle Intake Data Requirements Finalized
1502 " ⚖️ Guest Onboarding and Deployment Target Finalized
1504 7:22p 🟣 Project structure and dependencies initialized
1505 7:24p 🟣 Backend API and database layer implemented
1506 7:27p 🟣 Complete frontend SPA implemented with four user views
1507 " 🟣 Test suite, documentation, and deployment configuration completed
1508 7:33p 🟣 Blind Wine Tasting SPA deployed and running with LIVE TASTING workflow
1509 " 🟣 Wine Tasting App SPA deployed and functional with complete LIVE TASTING workflow
1510 7:36p 🟣 Blind Wine Tasting Application - Complete Frontend and Backend Implementation
1511 " 🔴 File Upload Handler Hardened with MIME Type Whitelist
1512 " 🔵 Test Suite Validates Core Workflows - All Tests Passing
1513 7:37p 🔵 Production Build Pipeline Executes Successfully
1514 " 🔵 Frontend Single-Page Application Code Structure - Complete Implementation
1515 " 🔵 SQLite Database Schema and Aggregation Layer - Complete Data Model
1516 7:46p 🔵 macOS hostname command doesn't support -I flag
1517 " 🔵 Server listening on port 3000, but network configuration reveals potential IPv6-only binding issue
1518 " 🔵 Server is accessible via network IP and localhost; macOS firewall disabled—issue is mobile-side
1519 8:39p 🔵 Current star rating and grape guess implementation structure
1520 8:40p 🟣 Dynamic star rating UI and grape dropdown from scanned bottles
1523 8:41p 🔵 Star rating and grape dropdown UI live and rendering correctly
1524 " 🔴 Star rating component not interactive - hidden radio button blocks user input
1525 " 🔴 Star rating interaction fixed with visual update handler
S645 Test and refine the wine bottle label scanning UI/workflow in the Host check-in interface (May 21 at 8:57 PM)
S646 Debug and fix wine label scanning failure: bottle image uploads but no sleeve assigned when AI scan fails (May 21 at 8:59 PM)
S647 Debug and fix label scanning in Winey (Blind Wine Tasting Event application) - model compatibility issue preventing wine bottle metadata extraction (May 21 at 9:02 PM)
1526 9:05p 🔵 Validated Anthropic API access and surveyed available Claude models
1527 " ✅ Updated deprecated Claude vision model to current version across config and code
1528 " 🔵 Label scanning function times out during execution with current model
1529 9:06p 🔵 Label scanning vision successfully extracts wine bottle metadata from images
1530 " 🔵 Wine bottle metadata successfully persisted to SQLite database via label-scan integration
1531 " 🔵 Full test suite passes with 5/5 tests covering core workflows and fallback handling
1532 " 🔵 Production build pipeline executes successfully with CSS minification and vendor asset bundling
1533 " 🔵 Wine tasting application server started and listening on localhost:3000
S648 Clarify shared party album UI label and improve host session persistence across page refreshes (May 21 at 9:06 PM)
1534 9:08p 🔵 Party photo upload and gallery system fully implemented across frontend, backend, and database
1535 " ✅ Host session token migrated from sessionStorage to localStorage for persistence across page refreshes
S649 Fix grape guessing dropdown to always show canonical red wine varieties, augmented by label-scan variants (May 21 at 9:08 PM)
1536 9:10p 🔵 Grape guessing options dynamically narrow based on wines scanned during event
1537 " ✅ Grape guessing list changed from dynamic narrowing to always-include-canonical with scanned augmentation
1538 " 🔵 Grape guessing logic updated and validated—canonical list always returned as baseline
S650 Clarification: Does Winey average the guest star ratings across bottles? (May 21 at 9:11 PM)
S651 Design decision: Should Winey use anonymous or identified guest ratings during a wine party event? (May 21 at 10:05 PM)
S652 TV Leaderboard Redesign: Implement "Bottle Race" Display for Winey Wine Tasting App (May 21 at 10:06 PM)
1539 10:08p 🔵 Rating averaging and display implementation in Winey leaderboard and reveal views
1540 10:09p 🔵 Current rating system tracks guest identity via userId and returns names in reveal
1541 " 🟣 TV leaderboard redesigned to show visual bottles and live grape guess consensus
1542 " 🟣 Grape guess aggregation and bottle race leaderboard fully implemented and tested
1543 " 🟣 Bottle race TV leaderboard deployed and visually verified live
S653 TV Display Setup: Instructions for Accessing Bottle Race Leaderboard on Big-Screen TV (May 21 at 10:10 PM)
### May 22, 2026
1544 6:58a ✅ Wine bottle UI redesign — realistic bottle shapes with ratings below
1545 7:00a ✅ Bottle UI redesign completed and tested
1546 " 🔵 Wine bottle UI renders correctly in TV view
S654 Redesign wine bottle display in TV view — make bottles look like wine bottles instead of boxes, remove rank badges and grape labels, show tasting average below bottle, remove "LIVE TASTING" status. (May 22 at 7:00 AM)
1547 7:01a ✅ Sleeve label styling enhanced with realistic wine label appearance
1548 " ✅ Wine label styling patch applied and validated

Access 692k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
