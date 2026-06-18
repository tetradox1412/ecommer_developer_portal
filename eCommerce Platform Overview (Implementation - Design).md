## **eCOMMERCE PLATFORM** 

## **How It Works** 

_A Plain-English Guide for Everyone_ 

## With Full Technical Appendices 

Prepared for: **Platform Engineering Team** Version 2.0  |  2026 

eCommerce Platform — Plain-English Overview & Reference 

## **Table of Contents** 

Table of Contents ....................................................................................................................... 2 1.  The Big Picture ..................................................................................................................... 5 2.  The Three Websites We Are Building .................................................................................... 6 2.1  The Customer Dashboard  —  For Potential and Active Customers ................................. 6 2.2  The Developer Partner Console  —  For Developers ....................................................... 6 2.3  The Enterprise Resource Planning (ERP) Simulation Portal  —  For Potential Customers7 3.  How a Feature Goes from Idea to Live .................................................................................. 8 4.  Who Builds This .................................................................................................................... 9 5.  The Plan — Three Phases ...................................................................................................10 Phase 1 — Foundations  (Weeks 1–4) ..................................................................................10 Phase 2 — Core Features  (Weeks 5–10) .............................................................................10 Phase 3 — Advanced Features  (Weeks 11–16) ...................................................................10 Appendix A — Architectural Paradigm ......................................................................................12 A.1  The "Uber for Developers" Model ...................................................................................12 A.2  Pre-Built Components — Not in Scope for This Pod ......................................................12 A.3  DSL Formal Model Reference ........................................................................................12 Appendix B — Team Composition & Role Responsibilities .......................................................14 B.1  The Five Functional Streams ..........................................................................................14 B.2  Detailed Role Responsibilities ........................................................................................14 Frontend & Integration Lead ..............................................................................................14 Customer Portal Stream — Lead React Developer ............................................................15 Customer Portal Stream — React Developer .....................................................................15 Developer Portal Stream — React Developer ....................................................................15 BFF & Integration Stream — Spring Boot Engineer ...........................................................15 Shared Services — QA & Security Engineer ......................................................................15 Shared Services — UX Technical Writer ............................................................................15 ERP Simulation Portal Stream — Lead React Developer ...................................................15 ERP Simulation Portal Stream — React Developer ...........................................................16 Appendix C — Hiring Plan ........................................................................................................17 C.1  Hiring Priority Sequence ................................................................................................17 C.2  Role Profiles & Interview Criteria ....................................................................................17 Frontend & Integration Lead — Senior to Staff Level .........................................................17 Lead Customer Portal React Developer — Senior Level ....................................................18 Customer Portal React Developer — Mid to Senior Level ..................................................18 

Confidential — Internal Use Only  |  Page 2 

eCommerce Platform — Plain-English Overview & Reference 

Developer Portal React Developer — Senior Level with Developer Tooling Background ...18 BFF & Integration Engineer — Senior Backend or Full-Stack Level ...................................18 QA & Security Engineer — Mid to Senior Level .................................................................19 UX Technical Writer — Mid Level ......................................................................................19 Lead ERP Simulation Portal React Developer — Senior Level ..........................................19 ERP Simulation Portal React Developer — Mid to Senior Level .........................................19 Appendix D — Design Methodology ..........................................................................................20 D.1  Design System First — Non-Negotiable .........................................................................20 D.2  Tooltip Copy Automation ................................................................................................20 D.3  Glass Box Architecture Viewer — Design Specification .................................................20 Appendix E — Customer Dashboard: Full Screen Specification ................................................22 E.1  Real-Time Status — The Non-Negotiable Architecture Decision ....................................22 Appendix F — Developer Partner Console: Full Screen Specification .......................................23 F.1  DSL Playground — Detailed Panel Specification ............................................................23 Appendix G — ERP Simulation Portal: Full Specification ..........................................................25 G.1  Core Screens .................................................................................................................25 G.2  Simulation Execution Model ...........................................................................................26 G.3  Design Mandate .............................................................................................................26 Appendix H — BFF & Integration Architecture ..........................................................................27 H.1  BFF Responsibilities ......................................................................................................27 H.2  API Contract Process .....................................................................................................27 H.3  Key BFF Endpoint Reference .........................................................................................27 Appendix I — Phased Execution Plan .......................................................................................29 Phase 1 — Foundation (Weeks 1–4) .....................................................................................29 Phase 2 — Core Features (Weeks 5–10) ..............................................................................29 Phase 3 — Advanced Features (Weeks 11–16) ....................................................................30 Appendix J — Security & Architectural Strictness .....................................................................32 J.1  No Direct Calls ................................................................................................................32 J.2  The Manifest is Law ........................................................................................................32 J.3  Zero Shared State ..........................................................................................................32 J.4  Role-Scoped JWT Enforcement ......................................................................................32 Appendix K — End-to-End Feature Lifecycle ............................................................................34 Appendix L — Risks & Mitigations.............................................................................................35 Appendix M — Interview Question Bank ...................................................................................36 M.1  Frontend & Integration Lead ..........................................................................................36 Level 1 (Foundational) .......................................................................................................36 

Confidential — Internal Use Only  |  Page 3 

eCommerce Platform — Plain-English Overview & Reference 

Level 2 (Technical/Role-Specific) .......................................................................................36 Level 3 (Logical/AI-Augmented) .........................................................................................36 M.2  Customer Portal Stream (Lead & React Developer).......................................................36 Level 1 (Foundational) .......................................................................................................36 Level 2 (Technical/Role-Specific) .......................................................................................36 Level 3 (Logical/AI-Augmented) .........................................................................................37 M.3  Developer Portal Stream (React Developer) ..................................................................37 Level 1 (Foundational) .......................................................................................................37 Level 2 (Technical/Role-Specific) .......................................................................................37 Level 3 (Logical/AI-Augmented) .........................................................................................37 M.4  BFF & Integration Stream (Spring Boot Engineer) .........................................................37 Level 1 (Foundational) .......................................................................................................37 Level 2 (Technical/Role-Specific) .......................................................................................37 Level 3 (Logical/AI-Augmented) .........................................................................................38 M.5  Shared Services Stream (QA & UX Technical Writer) ....................................................38 Level 1 (Foundational) .......................................................................................................38 Level 2 (Technical/Role-Specific) .......................................................................................38 Level 3 (Logical/AI-Augmented) .........................................................................................38 M.6  ERP Simulation Portal Stream (Lead & React Developer) .............................................38 Level 1 (Foundational) .......................................................................................................39 Level 2 (Technical/Role-Specific) .......................................................................................39 Level 3 (Logical/AI-Augmented) .........................................................................................39 Appendix N — Technology Stack Reference ............................................................................40 

Confidential — Internal Use Only  |  Page 4 

eCommerce Platform — Plain-English Overview & Reference 

## **1.  The Big Picture** 

Imagine an app store — but instead of apps on your phone, it is a store of powerful business features for online shops. Store owners (we categorize them as Potential Customers and Active Customers) can browse this store, pick the features they need — like a loyalty points system, a smart inventory tracker, or a custom checkout — and switch them on with a few clicks. 

Those features are not built by us. They are built by independent software developers (we call them Developer Partners) who publish their work to the platform, just like developers publish apps to the App Store or Google Play. 

## 💡 **The One-Sentence Summary** 

We are building the marketplace and the behind-the-scenes machinery that connects Active Customers who need custom features and Potential Customers browsing the catalog, with the developers who build them — safely, reliably, and without the two ever having to talk directly to each other. 

Our job is to build the three websites (portals) that make this happen, plus the invisible engine that connects them all together. 

## **Platform Architecture — How All the Pieces Fit** 

**==> picture [470 x 186] intentionally omitted <==**

**----- Start of picture text -----**<br>
🛍   Active Customer 🔬   Potential Customer 💻   Developer<br>↓ ↓ ↓<br>Customer Dashboard ERP Simulation Portal Developer Console<br>Browse, subscribe, activate Try before you buy Build, test, submit<br>↓ ↓ ↓<br>BFF — Backend for Frontend (the Safety Bridge)<br>All portal traffic passes through here — authentication, validation, data assembly, real-time events<br>↓<br>Wrapper DSL Engine SaaS Controller<br>Routes data between modules Compiles developer code Manages subscriptions & ports<br>**----- End of picture text -----**<br>


_The three backend systems (Wrapper, DSL Engine, SaaS Controller) are built by separate teams. Our job is to build everything above the BFF line._ 

## **[NOTE :** 

## **Active Customers** can access everything as **Potential Customers** and more **]** 

Confidential — Internal Use Only  |  Page 5 

eCommerce Platform — Plain-English Overview & Reference 

## **2.  The Three Websites We Are Building** 

Everything the user sees lives in one of three websites. Think of them as three different shop fronts on the same street, each serving a different type of visitor. 

## **2.1  The Customer Dashboard  —  For Potential and Active Customers** 

## 🛍 **Who is it for?** 

Potential Customers exploring the catalog, and Active Customers who want to add new capabilities to their online shop. They are not technical people. They should be able to use this site the same way they would use Netflix or Amazon. 

On this website, a Potential or Active Customer can: 

- Browse a marketplace of available features (called modules), each with a plain-English description of what the feature does and what customer data it will access. 

- Subscribe to a module — like subscribing to a streaming service — with one click. 

- Watch the feature being set up in real time, with a live progress bar instead of a blank loading screen. 

- Use the Glass Box Viewer — a diagram that shows exactly which parts of the store the module can see and which it cannot, so there are no surprises. 

- Submit a feature request — a guided form for Active Customers to describe a custom feature they need, which gets sent automatically to available developers (Potential Customers cannot access this). 

## **2.2  The Developer Partner Console  —  For Developers** 

## 💻 **Who is it for?** 

Professional software developers who want to build and publish modules to the marketplace. They are technical experts who will judge the quality of our tools harshly. 

On this website, a developer can: 

- Write module code in a browser-based code editor (no software to install). 

- Test their code in a safe sandbox environment before it goes anywhere near a real customer's shop. 

- Browse the full list of available platform APIs — the building blocks they are allowed to use. 

- Submit their finished module through a secure upload process. 

- See customer feature requests and claim the ones they want to build. 

Confidential — Internal Use Only  |  Page 6 

eCommerce Platform — Plain-English Overview & Reference 

## **2.3  The Enterprise Resource Planning (ERP) Simulation Portal  —  For Potential Customers** 

## 🔬 **Who is it for?** 

Potential Customers who are evaluating the platform and want to see what they are getting before they pay for it. The simulation runs on our servers using real module logic — think of it as a test drive before the purchase, with no commitment required. 

On this website, a Potential Customer can: 

- Pick any combination of modules they are considering buying — no subscription needed — and arrange them on a visual canvas. 

- Run a live simulation on our servers to see exactly how those modules would interact with each other using pretend data — no commitment, no purchase required. 

- Watch a live diagram of data flowing between modules in real time. 

- See a clear warning if two modules are going to conflict — explained in plain English, not error codes. 

- Compare two different simulations side by side and download a PDF report to share with their team. 

Confidential — Internal Use Only  |  Page 7 

eCommerce Platform — Plain-English Overview & Reference 

## **3.  How a Feature Goes from Idea to Live** 

Here is the complete journey of a custom feature, from the moment an Active Customer decides they need something new, to the moment their shoppers can use it. Every step is handled automatically — no emails, no phone calls between the Active Customer and the developer. 

**The Feature Journey at a Glance** 

||**→**||**→**||**→**||**→**||**→**||
|---|---|---|---|---|---|---|---|---|---|---|
|①**Request**<br>Active<br>Customer<br>submits<br>feature<br>request||②**Claim**<br>Developer<br>claims ticket,<br>writes & tests<br>code||③**Submit**<br>Code +<br>passport file<br>uploaded<br>securely||④**Compile**<br>Platform builds &<br>provisions the<br>module<br>automatically||⑤**Activate**<br>Status flips to<br>ACTIVE —<br>Active<br>Customer<br>clicks Activate||⑥**Live**<br>Shoppers can use<br>the feature — the<br>Active Customer's<br>data stays<br>protected|
||||||||||||



The table below describes each step in more detail: 

||||
|---|---|---|
|**Step**|**Who Acts**|**What Happens**|
||||
|1|Active Customer|The Active Customer fills in a short form on the Customer<br>Dashboard describing the custom feature they want. They submit it.<br>It automatically appears in the Developer Console as a claimable<br>ticket.|
||||
|2|Developer|A developer sees the request in their inbox, claims it, and starts<br>writing the code using the in-browser code editor. They test it in the<br>sandbox until they are happy.|
||||
|3|Developer|The developer submits their finished code and a "passport" file<br>(called a manifest) that declares exactly what the module can and<br>cannot access. Nothing goes live without this passport.|
||||
|4|Platform (automatic)|The platform compiles the code, checks the passport, and sets up<br>an isolated space for the module to run in. This takes between 30<br>seconds and a few minutes.|
||||
|5|Active Customer|The Active Customer sees the module's status flip to ACTIVE in<br>their dashboard — without refreshing the page. They click Activate<br>and it is live on their shop.|
||||
|6|Shoppers|Customers shopping on the store can now use the new feature.<br>Everything runs through the platform's safety layer — the Active<br>Customer's data stays protected.|



## 🔒 **The Golden Rule** 

Every feature module runs in its own isolated box. It can only see the data its passport says it is allowed to see. No module can ever spy on another module or access data it has not declared. This is enforced automatically — no human has to check. 

Confidential — Internal Use Only  |  Page 8 

eCommerce Platform — Plain-English Overview & Reference 

## **4.  Who Builds This** 

We are building the front-facing part of this platform — everything the user actually sees and clicks. The team has nine people, organised into five groups. 

||||
|---|---|---|
|**Role / Group**|**People**|**What They Do in Plain English**|
||||
|**Integration Lead**|1|The team captain. Designs the rulebook that all three websites<br>follow, negotiates with the back-end teams on how data flows<br>in and out, and makes sure nothing clashes. Must be hired first<br>— without this person, nobody else has a clear job.|
||||
|**Customer Dashboard**<br>**Team**|2|Builds everything a Potential or Active Customer sees and<br>clicks: the marketplace, the subscription flow, the live progress<br>tracker, and the Glass Box diagram.|
||||
|**Developer Console**<br>**Developer**|1|Builds everything a developer sees and clicks: the browser-<br>based code editor, the API explorer, the submission portal,<br>and the sandbox dashboard.|
||||
|**BFF Engineer**|1|Builds the invisible safety bridge between the websites and the<br>back-end systems. Every click on any website goes through<br>this person's work before anything actually happens.|
||||
|**QA & UX Writer**|2|One person tests everything obsessively (including<br>deliberately trying to break the security rules). The other<br>person makes sure every message, tooltip, and error on<br>screen is written in plain English that a non-technical person<br>can understand.|
||||
|**ERP Simulation Portal**<br>**Team**|2|Builds the Enterprise Resource Planning (ERP) simulation<br>website: the visual module canvas, the live simulation runner,<br>the data flow diagram, and the conflict warnings and history<br>reports.|



Confidential — Internal Use Only  |  Page 9 

eCommerce Platform — Plain-English Overview & Reference 

## **5.  The Plan — Three Phases** 

The project runs for sixteen weeks, split into three phases. Each phase must be fully finished before the next one begins. 

Foundations  —  Weeks 1– **PHASE 1 →** Core Features  —  Weeks 5–10 **PHASE 2[→]** Advanced  —  Weeks 11–16 **PHASE 3** 4 ✔  Shared design system ✔  Marketplace live ✔  Glass Box Viewer ✔  API contracts agreed ✔  Subscription + real-time ✔  In-browser code editor (DSL) status ✔  All 3 portals scaffolded ✔  Simulation history & PDF ✔  Auth flow working ✔  ERP Portal running export simulations ✔  Full onboarding flows ✔  All security rules enforced 

## **Phase 1 — Foundations  (Weeks 1–4)** 

Before anyone builds a screen, the team establishes the shared rulebook. The lead designs all the reusable building blocks that both websites will share (buttons, cards, status badges), agrees the exact shape of every API with the back-end teams, and scaffolds the skeleton of all three websites. Nothing visible ships yet — but nothing will break later because of a foundation that was skipped. 

## **Phase 2 — Core Features  (Weeks 5–10)** 

Every screen a user actually needs in order to do their core job is built and tested. A Potential Customer can browse the marketplace, subscribe to a module, and watch it go live (becoming an Active Customer). A developer can write, test, and submit a module. The ERP Simulation Portal can run a live simulation. All security rules are enforced and tested in this phase. 

## **Phase 3 — Advanced Features  (Weeks 11–16)** 

The platform gets its most powerful features: the Glass Box Architecture Viewer, the full inbrowser code editor, simulation history with side-by-side comparison, and downloadable PDF reports. First-time onboarding flows guide new users through the platform. An accessibility audit ensures the product works for everyone. 

## ✅ **What "Done" Looks Like** 

A Potential Customer can sign up, browse the marketplace, try out any module combination in the ERP (Enterprise Resource Planning) Simulation Portal before buying, subscribe to their chosen modules, and activate them on their live shop — seamlessly becoming an Active 

Confidential — Internal Use Only  |  Page 10 

eCommerce Platform — Plain-English Overview & Reference 

Customer without asking anyone for help. A brand new developer can sign up, write code, test it, and submit a working module to production — also without any assistance. 

_— End of Plain-English Overview — Technical Appendices follow on the next pages._ 

Confidential — Internal Use Only  |  Page 11 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix A — Architectural Paradigm** 

## **A.1  The "Uber for Developers" Model** 

Module creation on this platform is a strict engineering discipline, not a drag-and-drop experience. Active Customers use a glass-box frontend to understand their data flows and subscribe to modules. Before purchasing, Potential Customers can evaluate any combination of marketplace modules inside the ERP (Enterprise Resource Planning) Simulation Portal — a sandboxed environment that runs real module logic on our remote servers against simulated data, giving buyers a genuine preview before they commit. Developer Partners write formal DSL code and manifest.xml files. The platform compiles the DSL, provisions isolated ports, and routes all traffic through the Wrapper Module — which acts as a switchboard, knowing addresses and public API lists but containing no business logic of its own. 

## **A.2  Pre-Built Components — Not in Scope for This Pod** 

The following systems are owned by separate teams and serve as integration targets for the frontend pod. The BFF engineer in this pod is responsible for integrating against these surfaces — not building or modifying them. 

|**Component**|**Responsibility**|**Integration Surface**|
|---|---|---|
||||
|**SaaS Controller**|Customer registry, module port<br>assignment, subscription state<br>management, license validation|REST APIs for configuration,<br>entitlement checks, and module<br>lifecycle events|
||||
|**Wrapper Module**|Cross-module API routing enforced<br>by manifest.xml and config.xml;<br>enforces public/private boundaries|wrapper-client SDK; discovery<br>endpoint GET /api/wrapper/modules;<br>403 PRIVATE_ENDPOINT on<br>violations|
||||
|**DSL Engine**|Compiles text-based DSL code into<br>executable Spring Boot and React<br>services|POST /api/dsl-engine/submit;<br>compilation status callbacks<br>consumed by BFF|



## **A.3  DSL Formal Model Reference** 

Developer Partners write module code using the platform's formal Domain-Specific Language. The DSL defines three layers that the Developer Portal must expose in its tooling: 

- UI Model: Component = <id, type, props, bindings, events> — declares React components declaratively with state bindings and event handlers. 

- API Model: API = <name, method, path, request, response> — declares backend interactions with typed request and response schemas. 

- Operational Semantics: dispatch(e) routes events to APIs; exec(api, db) produces state transitions and database writes; update(state, response) refreshes the frontend. 

Confidential — Internal Use Only  |  Page 12 

eCommerce Platform — Plain-English Overview & Reference 

The Manifest contract (manifest.xml) declares module identity, contextPath, and the explicit list of public APIs exposed through the Wrapper. Any endpoint not declared in the manifest returns 403 PRIVATE_ENDPOINT when accessed through the Wrapper. 

Confidential — Internal Use Only  |  Page 13 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix B — Team Composition & Role Responsibilities** 

## **B.1  The Five Functional Streams** 

|**Stream**|**Count**|**Scope**|**Key Deliverables**|
|---|---|---|---|
|||||
|**Frontend &**<br>**Integration Lead**|1|Architecture, API contract<br>ownership, cross-team liaison,<br>shared design token system|API contract documents, shared<br>component library, BFF<br>architecture spec|
|||||
|**Customer Portal**<br>**Stream**|2|All customer-facing screens:<br>marketplace, subscription flow,<br>Glass Box Architecture Viewer,<br>real-time module status<br>dashboard|Every customer screen; SSE-<br>based live status feed<br>integration|
|||||
|**Developer Portal**<br>**Stream**|1|All developer-facing screens: in-<br>browser DSL IDE, manifest<br>builder, API Explorer,<br>submission portal, sandbox<br>dashboard|DSL Playground with Monaco<br>Editor; Swagger-style API<br>Explorer|
|||||
|**BFF & Integration**<br>**Stream**|1|Backend-for-Frontend gateway<br>between both React portals and<br>the three existing backend<br>teams|API gateway, subscription state<br>machine, SSE server, auth<br>propagation, circuit-breaking|
|||||
|**Shared Services**<br>**Stream**|2|QA & security testing (1 person);<br>UX technical writing and<br>manifest-derived documentation<br>(1 person) — both serve all<br>portals|Automated contract test suite;<br>manifest schema validation;<br>customer and developer<br>documentation|
|||||
|**ERP Simulation**<br>**Portal Stream**|2|ERP Simulation Portal: module<br>interaction canvas, simulation<br>runner, data flow visualizer,<br>conflict detector, and simulation<br>history|Simulation canvas with React<br>Flow; sandbox simulation<br>runner; conflict detection<br>engine; data flow reports|



## **B.2  Detailed Role Responsibilities** 

## **Frontend & Integration Lead** 

This is the most critical hire and must be the first person on the team. Their first four weeks produce four non-negotiable outputs: (1) the shared design token library consumed by all portals; (2) the OpenAPI contract documents for every BFF endpoint; (3) the BFF architecture design — routing rules, auth propagation model, and real-time SSE channel specification; and (4) the Sprint 1 backlog for all portal teams. 

Confidential — Internal Use Only  |  Page 14 

eCommerce Platform — Plain-English Overview & Reference 

This person must be a hybrid engineer — comfortable reading a Spring Boot API specification in the morning and reviewing a React component architecture in the afternoon. Hiring a pure frontend engineer or a pure backend engineer for this role is the most common way this type of project fails. 

## **Customer Portal Stream — Lead React Developer** 

Carries all architectural decisions for the Customer Dashboard: state management strategy, the real-time status subscription model, and the Glass Box Architecture Viewer component built on D3 or React Flow. Works closely with the UX Technical Writer to ensure manifest-derived tooltip text renders correctly at every surface. 

## **Customer Portal Stream — React Developer** 

Implements the Module Marketplace screens, subscription forms, and the Specification Engine multi-step form. Works under direction from the Lead Customer Portal developer. Strong TypeScript and form-state management proficiency required. 

## **Developer Portal Stream — React Developer** 

Owns the entire Developer Console as a single developer. Integrates Monaco Editor for the inbrowser DSL IDE, implements the Swagger-style API Explorer powered by the Wrapper's getAllModules() endpoint, and builds the diff-aware manifest validation UI. 

## **BFF & Integration Stream — Spring Boot Engineer** 

Builds the intermediary layer between all React portals and the three existing backend teams. Key responsibilities: API gateway routing, the module subscription state machine, the SSE endpoint for real-time status, JWT propagation to upstream services, and error translation from upstream error codes into client-readable payloads. 

## **Shared Services — QA & Security Engineer** 

Focuses on REST API contract testing (consumer-driven contract tests using Pact or equivalent), manifest.xml schema validation, and private endpoint exposure testing. The primary security deliverable is a regression test that verifies any endpoint not declared in a module's manifest.xml returns 403 PRIVATE_ENDPOINT when accessed through the Wrapper. 

## **Shared Services — UX Technical Writer** 

Writes customer-facing tooltip copy derived from manifest.xml description fields, the DSL reference documentation for Developer Partners, first-run onboarding copy for all portals, and error message templates for every known failure mode. 

## **ERP Simulation Portal Stream — Lead React Developer** 

Confidential — Internal Use Only  |  Page 15 

eCommerce Platform — Plain-English Overview & Reference 

Owns the architecture and primary implementation of the ERP Simulation Portal. Responsibilities: the interactive module selection canvas, the simulation runner UI, the data flow visualizer built on React Flow, and the conflict detection UI. Must have experience building dataheavy, interactive graph UIs and strong TypeScript instincts for managing complex simulation state. 

## **ERP Simulation Portal Stream — React Developer** 

Implements the simulation history and reporting screens, the module configuration panel, the simulation diff view (comparing two simulation runs side by side), and the PDF export report feature. Works under direction from the Lead ERP developer with defined component contracts from the Integration Lead. 

Confidential — Internal Use Only  |  Page 16 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix C — Hiring Plan** 

Hiring must follow a strict sequence. Hiring out of this order results in engineers who have nothing to build, or architects with no team to direct. 

## **C.1  Hiring Priority Sequence** 

|||||
|---|---|---|---|
|**#**|**Role**|**Timing**|**Rationale**|
|||||
|1|**Frontend & Integration**<br>**Lead**|Immediately|All other hires depend on their output. No<br>architecture, no contracts, no roadmap without this<br>person. Do not start other hires until this role is<br>filled.|
|||||
|2 &<br>3|**Customer Portal Lead**<br>**Dev + Customer Portal**<br>**Dev**|Week 2|Hire both simultaneously — they form a self-<br>contained pair and need to collaborate from day<br>one on the shared component library.|
|||||
|4|**BFF & Integration**<br>**Engineer**|Week 3–4|Begins after API contracts are drafted by the<br>Integration Lead. Starting earlier leaves this person<br>without defined endpoints to implement.|
|||||
|5|**Developer Portal React**<br>**Developer**|Week 4|Less upfront dependency on contracts. Can start<br>on the DSL editor scaffold and Monaco Editor<br>integration in parallel with the BFF work.|
|||||
|6 &<br>7|**QA & Security**<br>**Engineer + UX**<br>**Technical Writer**|Week 6–8|Both arrive when there is something concrete to<br>test and something meaningful to document. Earlier<br>arrival leads to context-free work.|
|||||
|8|**Lead ERP Simulation**<br>**Portal Developer**|Week 5–6|Starts after the BFF engineer has scaffolded the<br>simulation sandbox endpoint and the Customer<br>Portal has shipped its first SSE-based screen. The<br>ERP portal shares the same BFF gateway and<br>design token library.|
|||||
|9|**ERP Simulation Portal**<br>**React Developer**|Week 7–8|Joins when the Lead ERP developer has defined<br>component contracts for the canvas and simulation<br>state machine. Earlier start without this context<br>creates duplicated or misaligned components.|



## **C.2  Role Profiles & Interview Criteria** 

## **Frontend & Integration Lead — Senior to Staff Level** 

**Required qualifications** 

- Demonstrated experience owning API contract design across a frontend-to-backend team boundary — not just consuming existing contracts, but producing them. 

Confidential — Internal Use Only  |  Page 17 

eCommerce Platform — Plain-English Overview & Reference 

- Production React at scale with state management ownership (Redux Toolkit, Zustand, or equivalent). 

- Experience implementing real-time UI using SSE or WebSocket from the server side, not just the client. 

- Spring Boot or equivalent Java backend experience sufficient to read, critique, and negotiate API specifications. 

- Prior work on a developer-facing product is strongly preferred. 

## **Interview tasks** 

- Design an API contract document for a module subscription flow — evaluate completeness, error case coverage, and version strategy. 

- Explain the tradeoffs between SSE and WebSocket for a deployment status feed — evaluate depth and nuance of response. 

- Walk through how they would structure a shared component library consumed by two distinct React applications with different audiences. 

## **Lead Customer Portal React Developer — Senior Level** 

## **Required qualifications** 

- Strong TypeScript proficiency; production experience with complex subscription or marketplace UIs. 

- Comfort with D3.js or React Flow for graph visualisation — required for the Glass Box Architecture Viewer. 

- Demonstrated experience with skeleton loading patterns, perceived performance optimisation, and micro-interaction design. 

- Accessibility implementation experience — WCAG 2.1 AA minimum. 

## **Customer Portal React Developer — Mid to Senior Level** 

## **Required qualifications** 

- Solid TypeScript and React foundations. 

- Experience with form-heavy UIs: multi-step flows, validation, and draft state persistence. 

- Comfortable working under direction from a lead developer with clear architectural constraints. 

## **Developer Portal React Developer — Senior Level with Developer Tooling Background** 

## **Required qualifications** 

- Prior production experience integrating Monaco Editor or CodeMirror in a real application. 

- Experience building or maintaining an API explorer, SDK documentation site, or CI/CD dashboard. 

- Ability to read an OpenAPI specification and independently decide how to render it in UI without product direction. 

- Strong personal opinions about developer UX — the Developer Portal's users are engineers who will judge harshly. 

## **BFF & Integration Engineer — Senior Backend or Full-Stack Level** 

Confidential — Internal Use Only  |  Page 18 

eCommerce Platform — Plain-English Overview & Reference 

## **Required qualifications** 

- Spring Boot with API gateway or BFF pattern implementation experience. 

- SSE or WebSocket server-side implementation in Java for a production application. 

- Experience consuming multiple upstream REST APIs and aggregating them for a single frontend client. 

- JWT authentication and role propagation across service boundaries. 

## **QA & Security Engineer — Mid to Senior Level** 

## **Required qualifications** 

- REST API contract testing automation — Pact or equivalent consumer-driven contract testing preferred. 

- XML schema validation experience, particularly for structured contract formats like manifest.xml. 

- Basic API security testing: private endpoint exposure verification, JWT tampering checks, role bypass validation. 

## **UX Technical Writer — Mid Level** 

## **Required qualifications** 

- Technical writing background with API or SDK documentation experience — this is not a marketing or content role. 

- Ability to read an XML or JSON schema and derive tooltip and error copy from it without handholding. 

- Experience writing onboarding flows and first-run experiences for SaaS products. 

## **Lead ERP Simulation Portal React Developer — Senior Level** 

## **Required qualifications** 

- Production experience building interactive node graph or canvas UIs — React Flow, D3, or comparable library required. 

- Strong TypeScript and complex state management experience; simulation state involves multistep async flows across multiple modules. 

- Experience integrating with sandbox or dry-run execution environments via REST or SSE. 

- Ability to translate ambiguous business requirements into concrete, testable UI specifications without product hand-holding. 

## **ERP Simulation Portal React Developer — Mid to Senior Level** 

## **Required qualifications** 

- Solid React and TypeScript foundations with a track record of implementing data visualisation and reporting screens. 

- Experience with comparison views, diff UIs, or before/after workflows. 

- Comfortable implementing PDF export or print-ready report generation from browser-side data. 

Confidential — Internal Use Only  |  Page 19 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix D — Design Methodology** 

## **D.1  Design System First — Non-Negotiable** 

Before a single portal screen is built, the Frontend & Integration Lead must produce a shared component library. This is not a full design system like Material UI or Ant Design — it is a lean, domain-specific token set covering the specific needs of this platform. 

|||
|---|---|
|**Token / Component**|**Purpose and Detail**|
|||
|**Module state color**<br>**semantics**|ACTIVE = green, INACTIVE = gray, COMPILING = amber, ERROR =<br>red — defined as design tokens, consistent across all portals without<br>exception.|
|||
|**ModuleCard component**|Shared card rendering a module's name, status badge, version<br>number, developer partner name, and primary action button. Used in<br>the Marketplace, the Developer's submission history, and as canvas<br>nodes in the ERP Simulation Portal.|
|||
|**StatusBadge component**|Renders ACTIVE / INACTIVE / COMPILING / ERROR with a<br>consistent icon and color treatment derived from the token set. If the<br>badge is fixed once, all portals inherit the fix.|
|||
|**FormField pattern**|Consistent label, input, validation error message, and helper text<br>layout used by all forms across all portals.|
|||
|**LoadingSkeleton pattern**|Consistent skeleton UI for async data fetches. Particularly important<br>for the Module Marketplace which loads manifest data from the BFF.|
|||
|**Typography scale**|H1 through body and caption text. The same scale across all portals<br>prevents visual fragmentation when a user moves between them.|



## **D.2  Tooltip Copy Automation** 

1. Module developer submits manifest.xml with description fields populated (enforced minimum quality by the QA engineer). 

2. The BFF ingests the manifest and parses the description text into structured tooltip payloads. 

3. The Customer Dashboard renders the parsed descriptions as tooltips on module cards, API access indicators in the Glass Box viewer, and help text in the subscription confirmation screen. 

4. The UX Technical Writer audits submitted manifests for tone and completeness. A manifest failing minimum description standards is rejected at the BFF validation step before reaching the DSL Engine. 

## **D.3  Glass Box Architecture Viewer — Design Specification** 

Confidential — Internal Use Only  |  Page 20 

eCommerce Platform — Plain-English Overview & Reference 

The Glass Box Viewer is the centrepiece of the Customer Dashboard's self-explanatory mandate. It is rendered from manifest.xml data by the Lead Customer Portal developer using D3 or React Flow. 

When a customer views a subscribed module, the viewer renders a node graph with this structure: 

- A central node labeled with the module name and version number. 

- Outgoing edges to each resource the module accesses — labeled with the access type (reads Inventory API, writes Isolated Database). 

- Color-coded distinction between public nodes (blue, accessible to other modules via the Wrapper) and private nodes (gray, internal only). 

- An expandable accordion showing the manifest.xml public API list in human-readable form, with description text from the manifest fields. 

Confidential — Internal Use Only  |  Page 21 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix E — Customer Dashboard: Full Screen Specification** 

||||
|---|---|---|
|**Screen**|**Description**|**Key Technical Requirement**|
||||
|**Module Marketplace**|Browse all available modules. Each card<br>shows module name, description excerpt,<br>security rating, developer partner, and<br>subscription status.|Paginated BFF endpoint; tooltip<br>text parsed from manifest.xml<br>description fields|
||||
|**Module Detail View**|Full module page with Glass Box<br>Architecture Viewer, complete public API<br>list, version changelog, security rating<br>details, and Subscribe / Activate controls.|React Flow or D3 graph<br>component; full manifest parsed<br>and returned by BFF|
||||
|**My Subscriptions**|List of all subscribed modules with real-<br>time status indicators. Status updates<br>appear without page refresh.|Persistent SSE connection from<br>BFF; EventSource API on the<br>client|
||||
|**Activation Flow**|When a customer activates a module, a<br>live progress tracker shows: Queued ><br>Compiling > Provisioning Port > Updating<br>Wrapper > Active.|SSE event stream; BFF<br>subscribes to DSL Engine and<br>SaaS Controller status events<br>and forwards them|
||||
|**Specification**<br>**Engine**|Guided multi-step form where Active<br>Customers submit structured feature<br>requests for custom modules, which are<br>routed to Developer Partners as<br>claimable tickets.|Multi-step form with draft state<br>persistence; BFF creates ticket<br>in developer marketplace|



## **E.1  Real-Time Status — The Non-Negotiable Architecture Decision** 

DSL compilation and module deployment are inherently asynchronous operations. The pipeline from DSL submission to a live module involves the DSL Engine compiling code, the SaaS Controller provisioning an isolated port, and the Wrapper reloading its config.xml. This pipeline may take between thirty seconds and several minutes. 

The Customer Dashboard must never show a static loading spinner during this process. It must reflect the live pipeline state using a persistent connection to the BFF. Server-Sent Events (SSE) is the recommended implementation because the status feed is unidirectional, SSE reconnects automatically on connection drop, and SSE is simpler to implement behind an API gateway than WebSocket. 

Confidential — Internal Use Only  |  Page 22 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix F — Developer Partner Console: Full Screen Specification** 

||||
|---|---|---|
|**Screen**|**Description**|**Key Technical Requirement**|
||||
|**DSL Playground /**<br>**IDE**|Three-panel in-browser IDE: left panel<br>(Monaco/CodeMirror code editor with<br>DSL syntax support), centre panel (live<br>structural validation feed), right panel<br>(dry-run execution trace).|Monaco Editor with custom DSL<br>language schema; client-side<br>parser for structural validation;<br>BFF sandbox endpoint for dry-<br>run trace|
||||
|**Manifest Builder**|Schema-driven form for authoring<br>manifest.xml. Every field matches the<br>manifest schema exactly. Live XML<br>preview panel updates as the developer<br>types.|Client-side XML generation from<br>form state; live preview panel;<br>schema enforcement|
||||
|**API Explorer**|Swagger/OpenAPI-style interface<br>showing all Wrapper-reachable paths for<br>all active modules. Developers can<br>inspect paths, methods, required roles,<br>and example responses.|Calls BFF which proxies<br>getAllModules() from the<br>Wrapper SDK; renders<br>structured API surface|
||||
|**Submission Portal**|Secure upload of compiled DSL code and<br>manifest.xml with version management<br>and submission history. Status updates<br>appear in real time.|POST /bff/dsl/submit;<br>submission status tracked via<br>SSE; history table with version<br>diffs|
||||
|**Sandbox**<br>**Dashboard**|Full test environment for running DSL<br>logic against a sandbox database before<br>pushing to the live SaaS Controller.|Sandbox environment<br>provisioned by SaaS Controller;<br>BFF mediates all access and<br>logs executions|
||||
|**Ticket Inbox**|Developer Partners see and claim<br>incoming custom feature requests<br>submitted by Active Customers through<br>the Specification Engine.|SSE or polling from BFF; ticket<br>state machine (OPEN,<br>CLAIMED, IN_PROGRESS,<br>SUBMITTED) managed by BFF|



## **F.1  DSL Playground — Detailed Panel Specification** 

## **Left Panel — Code Editor** 

Monaco Editor is the recommended implementation because it is the same editor underpinning VS Code, supports custom language schemas for syntax highlighting and auto-complete, and is well-documented. The DSL tooling team must provide a JSON schema for the DSL language that the Developer Portal developer loads into Monaco. This gives developers real-time syntax highlighting and IntelliSense for all DSL constructs without any server round-trip. 

## **Centre Panel — Validation Feed** 

As the developer types (debounced at 500ms), a client-side DSL parser checks structural validity: are all required tuple fields present, is the contextPath format valid, and does the publicApis list contain at least 

Confidential — Internal Use Only  |  Page 23 

eCommerce Platform — Plain-English Overview & Reference 

one entry? These are checks that do not require the DSL Engine and run entirely in the browser. Errors appear as line-annotated compiler-style messages. 

**Right Panel — Dry-Run Execution Trace** 

When the developer clicks Run Dry, the manifest and DSL code are submitted to the BFF's sandbox endpoint. The BFF forwards to the DSL Engine's dry-run mode, which returns a simulated execution trace: what state transitions would occur, what database operations would be issued, and what API responses would be returned given a sample event payload. 

Confidential — Internal Use Only  |  Page 24 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix G — ERP Simulation Portal: Full Specification** 

The Enterprise Resource Planning (ERP) Simulation Portal is the third customer-facing interface of the platform. Its purpose is to give Potential Customers who are considering a purchase a simulation ground where they can select any combination of modules from the marketplace — with no prior subscription required — run a sandboxed simulation on our remote servers, and observe exactly how those modules would interact before committing to any purchase. 

## **G.1  Core Screens** 

|**Screen**|**Description**|**Key Technical Requirement**|
|---|---|---|
||||
|**Module Selection**<br>**Canvas**|A drag-and-drop canvas where the<br>Potential Customer picks any<br>combination of modules from the full<br>marketplace catalog — including modules<br>they have not yet purchased — and<br>arranges them into a simulation<br>configuration. Modules are represented<br>as React Flow nodes. The customer can<br>parameterise each module with synthetic<br>input data before running.|React Flow canvas with<br>draggable marketplace-catalog<br>nodes; configuration side-panel<br>per node; BFF endpoint to load<br>available marketplace modules|
||||
|**Simulation Runner**|Executes the configured module set<br>against the BFF ERP sandbox. A live<br>progress indicator shows each module<br>being initialised and the data passing<br>between them. Results appear in real<br>time via SSE. The Potential Customer<br>can pause, inspect mid-run state, or<br>abort.|POST /bff/erp/simulate; SSE<br>event stream for live execution<br>steps; abort signal via DELETE<br>/bff/erp/simulate/{id}|
||||
|**Data Flow**<br>**Visualizer**|Post-run, the canvas animates the actual<br>data paths observed during simulation:<br>which module sent data to which, what<br>the payload shape was, and which<br>Wrapper API was used. Edges are color-<br>coded by flow volume.|React Flow edge animation from<br>simulation result graph; tooltip<br>overlay with payload schema;<br>public/private API distinctions<br>inherited from manifest|
||||
|**Conflict Detector**|Surfaces any conflicts detected during<br>simulation: two modules attempting to<br>write to the same resource, contextPath<br>collisions, role permission conflicts, or<br>circular API dependencies. Each conflict<br>is a human-readable card.|Conflict results parsed from BFF<br>simulation response; severity-<br>ranked list (BLOCKING /<br>WARNING / INFO); links to<br>affected module detail pages|
||||
|**Simulation History**|A log of all previous simulation runs with<br>their configurations, outcomes, and<br>conflict summaries. Potential Customers|GET /bff/erp/simulations; diff<br>view component; PDF export|



Confidential — Internal Use Only  |  Page 25 

eCommerce Platform — Plain-English Overview & Reference 

|**Screen**|**Description**|**Key Technical Requirement**|
|---|---|---|
||||
||can reload a past configuration, compare<br>two simulation runs side by side, or<br>export a run as a PDF report.|from browser-side simulation<br>data|



## **G.2  Simulation Execution Model** 

1. The ERP Portal submits the simulation configuration to POST /bff/erp/simulate. 

2. The BFF validates that each module in the configuration exists and is available in the marketplace — no active subscription is required. 

3. The BFF instructs the SaaS Controller's sandbox to initialise the selected modules in isolated sandbox ports. 

4. The BFF orchestrates the simulation pass, feeding synthetic input through the module topology and recording each transition. 

5. Each execution step is emitted as an SSE event, updating the live progress indicator and populating data flow graph edges in real time. 

6. When the simulation completes or terminates with a conflict, the BFF persists the result to simulation history and emits a final event. 

The simulation runtime is bounded at 120 seconds. If the simulation does not complete within this window, the BFF emits a SIMULATION_TIMEOUT event and the portal displays a partial result. 

## **G.3  Design Mandate** 

The conflict detection UI must never use raw error code language. Every conflict message must be written at the plain-English standard defined by the UX Technical Writer. A conflict card that reads 'MANIFEST_CONTEXT_COLLISION on /inventory' is not acceptable. 'Two modules are trying to use the same path (/inventory). Only one can be active at a time.' is the standard. 

Confidential — Internal Use Only  |  Page 26 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix H — BFF & Integration Architecture** 

The Backend-for-Frontend layer is the most architecturally important component in this pod. Every API call from any portal goes through the BFF without exception. No frontend code ever calls the Wrapper, DSL Engine, or SaaS Controller directly. 

## **H.1  BFF Responsibilities** 

- Authentication enforcement: validate the JWT on every incoming request before forwarding to any upstream service. 

- Request aggregation: combine data from multiple upstream APIs into a single response payload the frontend can consume directly. 

- Real-time channel: maintain the SSE endpoint that all portals subscribe to for live module status updates. 

- Subscription state machine: manage the module subscription lifecycle — PENDING, COMPILING, ACTIVE, INACTIVE, ERROR — and persist state across asynchronous pipeline steps. 

- Error translation: convert upstream error codes (403 PRIVATE_ENDPOINT, 503 MODULE_INACTIVE, 502 MODULE_UNREACHABLE) into human-readable client payloads. 

- Ticket routing: receive custom feature requests from Active Customers via the Specification Engine and route them to the Developer Partner Ticket Inbox. 

- Circuit-breaking: if an upstream service is unreachable, return a graceful degraded response rather than surfacing a raw 502 to the user. 

## **H.2  API Contract Process** 

The Frontend & Integration Lead chairs a weekly API Contract Review meeting with one technical representative from each existing team. The frontend team presents the UI flows planned for the next sprint. The backend teams confirm whether required API endpoints exist in the planned state. Any gaps are logged as formal backlog items for the backend teams with a prioritised delivery date. 

Contract artifacts are maintained as OpenAPI 3.0 specification files in a shared repository. The BFF engineer uses these specs to generate client stubs. The QA engineer uses them to write contract tests. A frontend sprint may not begin implementation of a feature whose upstream API contract is not yet defined and reviewed. 

## **H.3  Key BFF Endpoint Reference** 

Confidential — Internal Use Only  |  Page 27 

eCommerce Platform — Plain-English Overview & Reference 

|**BFF Endpoint**|**Upstream**<br>**Service**|**Description**|
|---|---|---|
||||
|GET /bff/modules/marketplace|Wrapper +<br>SaaS Controller|Aggregates module list from Wrapper<br>getAllModules() with subscription status from<br>SaaS Controller. Returns combined<br>ModuleCard payloads.|
||||
|POST<br>/bff/modules/{name}/subscribe|SaaS Controller|Initiates subscription. SaaS Controller<br>provisions isolated port and triggers DSL<br>compilation pipeline.|
||||
|GET /bff/status/stream|SaaS Controller<br>+ DSL Engine|SSE endpoint. BFF subscribes to upstream<br>status callbacks and forwards lifecycle events<br>to connected clients.|
||||
|POST /bff/dsl/submit|DSL Engine|Forwards DSL code payload and<br>manifest.xml to the DSL Engine submission<br>endpoint. Returns submission ID for status<br>tracking.|
||||
|GET<br>/bff/wrapper/modules/{name}/apis|Wrapper|Returns the public API list for a named<br>module. Powers the API Explorer screen in<br>the Developer Portal.|
||||
|POST /bff/dsl/sandbox/run|DSL Engine<br>(sandbox)|Submits DSL code to the DSL Engine dry-run<br>sandbox and returns the execution trace for<br>the Playground's right panel.|
||||
|POST /bff/tickets|Internal ticket<br>store|Receives custom feature requests from Active<br>Customers via the Specification Engine and<br>creates claimable tickets in the Developer<br>Ticket Inbox.|
||||
|POST /bff/erp/simulate|SaaS Controller<br>(sandbox)|Initiates a sandboxed ERP simulation run on<br>our remote servers. Validates that each<br>requested module is available in the<br>marketplace catalog — no active subscription<br>required, as the ERP Portal is a pre-purchase<br>evaluation environment.|
||||
|GET /bff/erp/status/stream/{id}|SaaS Controller<br>(sandbox)|SSE endpoint for live simulation progress.<br>Emits STEP_COMPLETE,<br>MODULE_CONFLICT,<br>SIMULATION_COMPLETE, and<br>SIMULATION_TIMEOUT events.|
||||
|GET /bff/erp/simulations|Internal<br>simulation store|Returns the Potential Customer's simulation<br>history with configuration snapshots, outcome<br>summaries, and conflict counts.|
||||
|DELETE /bff/erp/simulate/{id}|SaaS Controller<br>(sandbox)|Aborts an in-progress simulation run and<br>releases the sandbox port allocation. Returns<br>204 on success.|



Confidential — Internal Use Only  |  Page 28 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix I — Phased Execution Plan** 

The project runs in three phases over sixteen weeks. Each phase has clearly defined exit criteria. A phase may not be closed and the next phase may not begin until all exit criteria are met. 

**Phase 1 — Foundation (Weeks 1–4)** 

|**Owner**|**Deliverable**|
|---|---|
|||
|**Integration Lead**|Shared design token library: module state colors, StatusBadge, ModuleCard,<br>FormField, LoadingSkeleton, typography scale|
|||
|Integration Lead|OpenAPI contract documents for all BFF endpoints — reviewed and signed off<br>by all three existing backend teams|
|||
|**Integration Lead**|BFF architecture design document: routing rules, auth propagation model, SSE<br>channel specification, and error code translation table|
|||
|Customer Portal<br>Team|React application scaffolded with authentication flow, route protection, and<br>shared component library integrated and rendering correctly|
|||
|**Dev Portal**<br>**Developer**|Developer Portal scaffolded with Monaco Editor integrated, DSL language<br>schema loaded, and syntax highlighting proof-of-concept working|
|||
|BFF Engineer|BFF gateway skeleton: health check endpoint, JWT validation middleware, and<br>first upstream connection to the Wrapper getAllModules() endpoint|
|||
|**ERP Portal Lead**|ERP Simulation Portal scaffolded: module selection canvas with React Flow,<br>connected to the full marketplace module catalog from the BFF, rendering<br>ModuleCard nodes — no simulation execution yet|



Phase 1 exit criteria: All portals successfully authenticate a test user. The shared component library is published and all three applications import and render it correctly. All API contract documents are reviewed, signed off, and committed to the shared repository. 

**Phase 2 — Core Features (Weeks 5–10)** 

|**Owner**|**Deliverable**|
|---|---|
|||
|**Customer Portal**|Module Marketplace with live data from BFF; ModuleCard components with<br>manifest-derived tooltip text rendering correctly|
|||
|Customer Portal|My Subscriptions screen with real-time SSE-based status updates — status<br>changes appear without page refresh|
|||
|**Customer Portal**|Activation Flow with live pipeline progress tracker: Queued > Compiling ><br>Provisioning Port > Updating Wrapper > Active|



Confidential — Internal Use Only  |  Page 29 

eCommerce Platform — Plain-English Overview & Reference 

|**Owner**|**Deliverable**|
|---|---|
|||
|Customer Portal|Specification Engine: multi-step Active Customer feature request form with draft<br>persistence and BFF ticket submission|
|||
|**Dev Portal**|DSL Submission Portal with manifest.xml schema validation, version<br>management, and submission history with SSE-based status updates|
|||
|Dev Portal|API Explorer: Swagger-style view of all Wrapper-reachable public APIs for all<br>active modules|
|||
|**Dev Portal**|Ticket Inbox: Developer Partners can see open Active Customer feature<br>requests and claim them, changing ticket state to IN_PROGRESS|
|||
|BFF Engineer|All endpoints in Appendix H implemented, tested, and passing contract tests|
|||
|**QA Engineer**|Full contract test suite covering all BFF endpoints; private endpoint exposure<br>regression tests against the Wrapper|
|||
|UX Writer|Tooltip copy templates, manifest description quality guidelines, and error<br>message copy for all known failure modes published|
|||
|**ERP Portal Lead**|Simulation Runner connected to POST /bff/erp/simulate; live SSE-based<br>progress indicator during simulation execution; Data Flow Visualizer rendering<br>post-run edge animations on the React Flow canvas|
|||
|ERP Portal Dev|Conflict Detector UI: severity-ranked conflict cards with UX-Writer-approved<br>plain-English templates; abort simulation control wired to DELETE endpoint|



Phase 2 exit criteria: A Potential Customer can subscribe to a module and watch its status update in real time without any page refresh, becoming an Active Customer. A developer can submit a DSL payload and receive live status updates through to ACTIVE or ERROR. A Potential Customer can run a full ERP simulation and see conflict warnings. The QA contract test suite passes end-to-end in CI. 

**Phase 3 — Advanced Features (Weeks 11–16)** 

|||
|---|---|
|**Owner**|**Deliverable**|
|||
|**Customer Portal**|Glass Box Architecture Viewer: D3/React Flow node graph rendered from<br>manifest.xml data, showing public and private resource access|
|||
|Dev Portal|DSL Playground: full three-panel IDE with Monaco Editor, client-side validation<br>feed, and dry-run execution trace from BFF sandbox|
|||
|**Dev Portal**|Manifest Builder: schema-driven form with live XML preview panel; validates<br>against manifest schema in real time|
|||
|Dev Portal|Sandbox Dashboard: full test environment for DSL logic against sandbox<br>database before live submission|
|||
|**Customer Portal**|Developer Partner rating and reputation system visible in the Module<br>Marketplace; derived from Active Customer feedback and submission history|
|||
|Both Portals|Module version history and changelog views; version diff comparison in the<br>Developer Portal|



Confidential — Internal Use Only  |  Page 30 

eCommerce Platform — Plain-English Overview & Reference 

|**Owner**|**Deliverable**|
|---|---|
|||
|**QA + UX Writer**|Full first-run onboarding flows for new Potential Customers and new developer<br>partners; accessibility audit to WCAG 2.1 AA on all screens|
|||
|ERP Portal Lead|Simulation History screen with full run log, side-by-side diff view comparing two<br>simulation configurations, and PDF export of a simulation report|
|||
|**ERP Portal Dev**|Module configuration panel per canvas node: Potential Customers can set<br>synthetic input parameters per module before simulation; saved configuration<br>templates for common module combinations|



Phase 3 exit criteria: A new Potential Customer can complete the full journey from account creation to running an ERP pre-purchase simulation of any two marketplace modules, subscribing to their chosen modules, activating them, and exporting the simulation report — seamlessly becoming an Active Customer all without any assistance. A new developer partner can complete the journey from account creation to submitting and deploying a working module through the sandbox to production. 

Confidential — Internal Use Only  |  Page 31 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix J — Security & Architectural Strictness** 

The following rules are inherited from the platform's core design and are non-negotiable. The frontend pod must enforce them without exception. 

## **J.1  No Direct Calls** 

No frontend code in any portal ever calls the Wrapper, DSL Engine, or SaaS Controller directly. All calls go through the BFF. If a developer bypasses this by hardcoding an upstream URL, it must be caught and removed in code review. The BFF is the single enforcement point for authentication, logging, and rate limiting. There are no exceptions. 

## **J.2  The Manifest is Law** 

The QA engineer's primary security deliverable is a regression test that verifies: any endpoint not declared in a module's manifest.xml returns 403 PRIVATE_ENDPOINT when accessed through the Wrapper. This test runs in CI on every deployment. Any manifest that attempts to declare a contextPath already claimed by another module is rejected at the BFF validation step before reaching the DSL Engine. 

## **J.3  Zero Shared State** 

DSL code submitted by Developer Partners must not directly query another module's database. The QA engineer's static analysis checks must flag any DSL API definition whose path does not match the module's declared contextPath. All cross-module data access must flow through the Wrapper via the wrapper-client SDK. 

## **J.4  Role-Scoped JWT Enforcement** 

||||
|---|---|---|
|**Portal / Action**|**Required JWT Role**|**BFF Enforcement Point**|
||||
|Customer Dashboard — all<br>screens|POTENTIAL_CUSTOMER<br>/ ACTIVE_CUSTOMER|BFF middleware on all /bff/customer/**<br>routes|
||||
|Developer Console — all<br>screens|DEVELOPER_PARTNER|BFF middleware on all /bff/developer/**<br>routes|
||||
|DSL submission endpoint|DEVELOPER_PARTNER<br>+ active license|BFF checks license entitlement with<br>SaaS Controller before forwarding to<br>DSL Engine|
||||
|Module activation|ACTIVE_CUSTOMER|BFF verifies subscription entitlement<br>with SaaS Controller before triggering<br>activation|



Confidential — Internal Use Only  |  Page 32 

eCommerce Platform — Plain-English Overview & Reference 

|**Portal / Action**|**Required JWT Role**|**BFF Enforcement Point**|
|---|---|---|
||||
|ERP Simulation Portal — all<br>screens|POTENTIAL_CUSTOMER|BFF middleware on all /bff/erp/** routes;<br>simulation endpoint verifies that each<br>requested module exists in the<br>marketplace catalog — no active<br>subscription required, as the portal is a<br>pre-purchase evaluation environment|



Confidential — Internal Use Only  |  Page 33 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix K — End-to-End Feature Lifecycle** 

The following describes the complete lifecycle of a custom module from an Active Customer's request to live storefront execution, showing where the frontend pod's work intersects with each pipeline step. 

|||||
|---|---|---|---|
|**Step**|**Actor**|**Action**|**Frontend Pod Involvement**|
|||||
|1|Active Customer|Submits a structured feature<br>request through the<br>Specification Engine|Customer Portal — multi-step form<br>with draft persistence; BFF routes<br>ticket to Developer Inbox|
|||||
|2|Developer Partner|Claims the ticket in the<br>Developer Console Ticket Inbox<br>and writes DSL code using the<br>Playground|Dev Portal — Ticket Inbox state<br>machine; DSL Playground with live<br>structural validation|
|||||
|3|Developer Partner|Submits DSL code and<br>manifest.xml via the Submission<br>Portal after sandbox testing|Dev Portal — Submission Portal;<br>BFF forwards to DSL Engine; SSE<br>status updates begin|
|||||
|4|DSL Engine|Compiles DSL code into<br>executable services; SaaS<br>Controller provisions an isolated<br>port for this module for this<br>customer|BFF receives status callbacks and<br>pushes COMPILING and<br>PROVISIONING events to SSE<br>channel|
|||||
|5|Wrapper Module<br>Team|Wrapper team reviews<br>manifest.xml, updates<br>config.xml with new module<br>connection details, restarts<br>Wrapper|SSE event: status transitions to<br>ACTIVE; Customer Dashboard My<br>Subscriptions updates in real time|
|||||
|6|Active Customer|Sees the module status become<br>ACTIVE in My Subscriptions<br>and clicks Activate in the<br>Activation Flow|Customer Portal — Activation Flow<br>with live pipeline progress tracker|
|||||
|7|Shopper|Uses the live module feature on<br>the storefront|Frontend calls BFF; BFF calls<br>Wrapper via SDK; Wrapper routes<br>to module — fully transparent to<br>shopper|



Confidential — Internal Use Only  |  Page 34 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix L — Risks & Mitigations** 

|**Risk**|**Severity**|**Mitigation**|
|---|---|---|
||||
|Frontend & Integration Lead hire<br>takes longer than expected or<br>wrong hire is made|Critical|Do not start other hires until this role is filled. A<br>wrong hire here costs more in lost direction than a<br>month's delay in hiring.|
||||
|Upstream API contracts not<br>agreed before frontend sprints<br>begin implementation|High|Enforce the API Contract Review meeting<br>cadence from Week 1. Block sprint planning on<br>unsigned contracts. This is a non-negotiable gate.|
||||
|Real-time SSE channel not ready<br>before Phase 2 Customer Portal<br>work begins|High|BFF engineer builds SSE skeleton in Phase 1 as<br>a foundation deliverable. Phase 2 Customer Portal<br>work assumes SSE is available and stable.|
||||
|DSL Playground scope creep<br>delays Developer Portal core<br>Phase 2 features|Medium|Scope the Playground explicitly as Phase 3 in<br>sprint planning. Phase 2 Developer Portal ships<br>submission form and API Explorer only —<br>Playground is out of scope.|
||||
|Design divergence between<br>Customer and Developer portals|Medium|Shared component library enforced from Phase 1.<br>All portals import the same StatusBadge and<br>ModuleCard. Any divergence is caught in cross-<br>portal code review.|
||||
|manifest.xml description quality too<br>poor for auto-generated tooltips|Low–<br>Medium|UX Technical Writer enforces minimum<br>description field completeness as a manifest<br>validation rule at the BFF. Manifests that do not<br>meet the standard are rejected with a specific<br>error before reaching the DSL Engine.|
||||
|BFF becomes a bottleneck<br>causing frontend performance<br>issues|Low|BFF engineer implements caching on the module<br>marketplace endpoint (TTL 60s) and lazy loading<br>for the API Explorer. Response time SLA of<br>300ms p95 defined in Phase 1 contracts.|
||||
|ERP simulation sandbox resource<br>contention causes slow or failed<br>simulations for Potential<br>Customers running concurrent<br>sessions|Medium|BFF imposes a limit of one active simulation at a<br>time per user. A second POST /bff/erp/simulate<br>from the same Potential Customer while a<br>simulation is running returns 409<br>SIMULATION_ALREADY_RUNNING.|
||||
|ERP Simulation Portal creates a<br>false sense of safety: a Potential<br>Customer runs a successful<br>simulation but the live module<br>environment differs from the<br>sandbox|Medium|UX Technical Writer drafts a persistent disclaimer<br>on the simulation runner screen clarifying that<br>simulation uses synthetic data and sandbox ports.<br>The portal never implies that a successful<br>simulation guarantees production success.|



Confidential — Internal Use Only  |  Page 35 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix M — Interview Question Bank** 

This section outlines a leveled interview question bank for the Frontend & Integration pod. Questions are divided into three levels: Level 1 (Foundational), Level 2 (Technical/RoleSpecific), and Level 3 (Logical/AI-Augmented). 

## **M.1  Frontend & Integration Lead** 

Role Focus: Cross-team API contracts, shared architecture, and technical diplomacy. 

## **Level 1 (Foundational)** 

- Communication: If you had to explain what an API is to a non-technical Potential or Active Customer, how would you describe it using a simple analogy? 

- Process: When starting a brand-new project with a new team, what is the very first technical thing you like to get agreed upon before anyone writes a line of code? 

## **Level 2 (Technical/Role-Specific)** 

- API Contracts: Walk me through how you would design an OpenAPI 3.0 contract for the GET /bff/modules/marketplace endpoint, keeping in mind it must aggregate data from both the Wrapper and the SaaS Controller into a single payload. 

- Cross-Portal Architecture: You need to establish a shared design token library and component set for three distinct React applications. How do you technically structure and distribute this library so all teams can use it from day one? 

## **Level 3 (Logical/AI-Augmented)** 

- Conflict Resolution: An AI coding assistant generates a flawless, highly efficient OpenAPI specification for our new BFF. However, the existing backend teams say it doesn't match how their legacy systems actually work. Walk me through your logical steps for bridging the gap between an ideal AI-generated architecture and a messy human reality. 

## **M.2  Customer Portal Stream (Lead & React Developer)** 

Role Focus: Intuitive UI, complex state management, and data visualization for non-technical users. 

## **Level 1 (Foundational)** 

- User Empathy: Our main users for this dashboard will be Potential and Active Customers who might not be great with computers. What are one or two simple rules you always follow to make a web application feel easy to use? 

- React Fundamentals: In React, there are many ways to pass data around. What is your preferred way to handle basic state in an app, and why do you like it? 

## **Level 2 (Technical/Role-Specific)** 

Confidential — Internal Use Only  |  Page 36 

eCommerce Platform — Plain-English Overview & Reference 

- Data Visualization: The Glass Box Architecture Viewer requires rendering a node graph from parsed manifest.xml data. Walk me through how you would implement this using D3.js or React Flow to distinguish between public and private API nodes. 

- Real-Time UI: We are using Server-Sent Events (SSE) to track a module's live deployment status. How do you implement the EventSource API in React to handle this unidirectional feed and update the UI without requiring a page refresh? 

## **Level 3 (Logical/AI-Augmented)** 

- Information Curation: AI tools are great at generating incredibly dense, data-heavy dashboards. What heuristics or rules would you apply to strip a complex architecture diagram down so a non-technical Potential Customer actually understands what they are buying, without losing the technical truth of the diagram? 

## **M.3  Developer Portal Stream (React Developer)** 

Role Focus: Professional-grade developer experience (DX), tooling UI, and structural validation. 

## **Level 1 (Foundational)** 

- Developer Experience: Think about your favorite code editor. What is one specific feature of its interface that makes your life easier as a developer? 

- Feedback Loops: When a developer makes a mistake submitting a form on our site, what makes a good error message versus a bad error message? 

## **Level 2 (Technical/Role-Specific)** 

- IDE Integration: Our platform requires an in-browser DSL Playground. How would you integrate Monaco Editor into a React application, and how would you load a custom language schema to provide real-time syntax highlighting for our proprietary DSL? 

- Dynamic UI Generation: You need to build a Swagger-style API Explorer. If the BFF provides you with an endpoint detailing all active module paths, methods, and example responses, how do you dynamically construct this UI? 

## **Level 3 (Logical/AI-Augmented)** 

- Edge-Case Hunting: You use an AI to generate the initial parser for our custom DSL in the browser. It works perfectly in 95% of cases but fails silently on edge-case syntax. How do you design a validation strategy to catch the 5% of failures an AI misses, knowing that our users will aggressively stress-test this IDE? 

## **M.4  BFF & Integration Stream (Spring Boot Engineer)** 

Role Focus: Middleman gateway, security enforcement, and asynchronous state management. 

## **Level 1 (Foundational)** 

- Architecture Fundamentals: In simple terms, why is it a good idea to have a BFF middleman layer, instead of letting the website talk directly to our database? 

- Graceful Degradation: If your backend tries to talk to another system, and that system is temporarily down, how do you prefer to handle that so the user's website doesn't just crash? 

## **Level 2 (Technical/Role-Specific)** 

Confidential — Internal Use Only  |  Page 37 

eCommerce Platform — Plain-English Overview & Reference 

- State Machines: The module activation pipeline involves the DSL Engine compiling code, the SaaS Controller provisioning ports, and the Wrapper reloading configs. How do you build the subscription state machine in Spring Boot to manage and persist these asynchronous states? 

- Auth Propagation: No frontend code can ever bypass the BFF. How do you implement middleware in Spring Boot to validate incoming JWTs and ensure that only users with the CUSTOMER role and an active subscription can trigger a module activation? 

## **Level 3 (Logical/AI-Augmented)** 

- Threat Modeling: You prompt an AI to write the JWT authentication and role-propagation middleware. It gives you a solution that is incredibly fast but complex. Before deploying it, what specific logical threat models or poison pill data injections would you test against it to ensure the AI hasn't accidentally created a cross-tenant data leak? 

## **M.5  Shared Services Stream (QA & UX Technical Writer)** 

Role Focus: Systemic quality, security boundary testing, and humanized technical communication. 

## **Level 1 (Foundational)** 

- QA Question: If we only have time to test three things before we launch a new webpage, how do you decide which features are the most important to test? 

- UX Writer Question: How do you take a scary-sounding technical error — like Database Timeout Error 504 — and rewrite it so a beginner understands what to do next? 

## **Level 2 (Technical/Role-Specific)** 

- QA Question: The core security rule of this platform is The Manifest is Law. How would you design an automated CI/CD regression test to verify that any endpoint not explicitly declared in a module's manifest.xml correctly returns a 403 PRIVATE_ENDPOINT error? 

- UX Writer Question: We automate our tooltips by parsing the description fields directly from a developer's manifest.xml file. Can you explain your process for reading an XML schema and creating strict quality guidelines to ensure developers write descriptions that non-technical Potential or Active Customers will actually understand? 

## **Level 3 (Logical/AI-Augmented)** 

- QA Question: An AI writes 10,000 automated contract tests for our APIs in three seconds. You cannot manually read all 10,000 tests. How do you logically design a strategy to test the quality and coverage of the AI's tests? 

- UX Writer Question: An AI parses our manifest file and automatically generates this error message for an Active Customer: FATAL: Module 403 PRIVATE_ENDPOINT accessed. Execution trace terminated to prevent cascade failure. How do you build a translation layer that turns technically rigid AI output into reassuring, actionable advice for a nontechnical user? 

## **M.6  ERP Simulation Portal Stream (Lead & React Developer)** 

Confidential — Internal Use Only  |  Page 38 

eCommerce Platform — Plain-English Overview & Reference 

Role Focus: Interactive simulation canvas, real-time execution feedback, data flow visualisation, and conflict communication. 

## **Level 1 (Foundational)** 

- User Mental Model: A Potential Customer is considering buying two modules — one for inventory and one for payments — but wants to understand how they will interact before spending any money. How would you describe what our Enterprise Resource Planning (ERP) Simulation Portal does to them in three sentences or fewer? 

- React Fundamentals: The simulation canvas has complex state: which modules are selected, what configuration each has, whether a simulation is running, and what the latest SSE event was. How do you approach structuring this state in a React application? 

## **Level 2 (Technical/Role-Specific)** 

- Canvas Architecture (Lead): You need to build a drag-and-drop module selection canvas using React Flow. Nodes come from the full marketplace module catalog — the customer may select any module, not just ones they have purchased — and edges are drawn by the simulation result. How do you manage the React Flow graph state alongside your application state (catalog data, simulation status) without them fighting each other? 

- Simulation SSE Integration: The ERP simulation emits step-by-step SSE events as the BFF runs each module in sequence. How do you consume this EventSource stream and use each event to progressively animate the data flow edges on the React Flow canvas without blocking the UI thread? 

- Conflict UX (Developer): The BFF returns a list of conflict objects, each with a severity, two conflicting module IDs, a conflict type, and a technical description. How do you build a conflict card component that translates this technical payload into plain-English copy using a UX-Writer-provided template system? 

## **Level 3 (Logical/AI-Augmented)** 

- Simulation Fidelity Problem: An AI suggests simulating module interactions entirely on the client using manifest.xml public API declarations — no BFF call needed, instant results. What are the critical failure modes of this client-side approach, and under what conditions would a manifest-only simulation mislead a customer into a false sense of safety? 

- Diff View Design: You use an AI to generate a side-by-side diff component comparing two simulation runs. It produces a technically correct JSON diff. How would you redesign this output so a non-technical Potential Customer can understand what changed between their two simulation attempts, without exposing them to raw JSON or technical field names? 

Confidential — Internal Use Only  |  Page 39 

eCommerce Platform — Plain-English Overview & Reference 

## **Appendix N — Technology Stack Reference** 

|**Layer**|**Technology**|**Notes**|
|---|---|---|
||||
|Frontend framework|React + Vite +<br>TypeScript|All portals. Vite for fast development server<br>and optimised production builds.|
||||
|State management|Zustand (preferred) or<br>Redux Toolkit|Integration Lead decides in Phase 1. Zustand<br>preferred for its lighter footprint on portal-<br>scale applications.|
||||
|Graph visualisation|React Flow (preferred)<br>or D3.js|For the Glass Box Architecture Viewer and<br>ERP Simulation Portal canvas. React Flow<br>preferred for ease of React integration and<br>built-in interaction handling.|
||||
|In-browser code editor|Monaco Editor|Same editor as VS Code. Supports custom<br>language schemas for DSL syntax<br>highlighting and IntelliSense without server<br>round-trips.|
||||
|Real-time channel|Server-Sent Events<br>(SSE)|BFF pushes lifecycle status events. Client<br>uses the native browser EventSource API<br>with automatic reconnection.|
||||
|BFF framework|Spring Boot (Java)|Consistent with existing backend teams.<br>Reduces knowledge transfer friction and<br>enables shared library usage.|
||||
|API contract format|OpenAPI 3.0|All contracts maintained in a shared<br>repository. BFF generates client stubs; QA<br>generates contract test skeletons.|
||||
|Contract testing|Pact (consumer-driven)|QA engineer implements. Ensures BFF and<br>frontend contracts stay synchronised through<br>CI validation.|
||||
|Cross-module routing|wrapper-client SDK<br>(Java Maven)|Existing Wrapper team artifact. BFF adds this<br>as a Maven dependency and uses it<br>exclusively — never calls the Wrapper server<br>directly.|
||||
|ERP simulation canvas|React Flow|Used in the ERP Simulation Portal for the<br>module selection canvas, data flow edge<br>animations, and simulation result graph.|
||||
|ERP simulation runtime|SaaS Controller<br>sandbox (existing)|The ERP Portal reuses the same sandbox<br>environment already used by the Developer<br>Partner sandbox dashboard. BFF<br>orchestrates module initialisation order and<br>inter-module data routing via the Wrapper<br>SDK in sandbox mode.|



_— End of Document —_ 

Confidential — Internal Use Only  |  Page 40 

