import { useState, useEffect, useRef } from "react";
import { AutocompleteDropdown } from "./components/AutocompleteDropdown";
import { MatrixRain } from "./components/MatrixRain";
import {
  playKeystrokeSound,
  playEnterSound,
  playErrorSound,
} from "./utils/soundEffects";

export default function App() {
  const [commandHistory, setCommandHistory] = useState<
    Array<{
      command: string;
      output: JSX.Element | string;
      timestamp: number;
    }>
  >([]);

  const [currentInput, setCurrentInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showMobileKeyboard, setShowMobileKeyboard] =
    useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Command aliases mapping
  const commandAliases: { [key: string]: string } = {
    ls: "projects",
    list: "projects",
    pwd: "whoami",
    info: "about",
    email: "contact",
  };

  // All available commands
  const allCommands = [
    "help",
    "about",
    "whoami",
    "skills",
    "projects",
    "contact",
    "clear",
    "sudo su",
    "cowsay",
    "matrix",
    "hack",
    "coffee",
    "theme",
    "sound",
    "ls",
    "pwd",
    "cat",
  ];

  // Welcome message on load
  useEffect(() => {
    const welcomeMessage = (
      <div className="fade-in">
        <div className="mb-4 flex justify-center">
          <pre className="text-terminal-green text-xs sm:text-sm text-left">
            {`
███████╗██████╗  ██████╗ ███╗   ██╗██╗███████╗ ██████╗ 
██╔════╝██╔══██╗██╔═══██╗████╗  ██║██║██╔════╝██╔═══██╗
███████╗██████╔╝██║   ██║██╔██╗ ██║██║███████╗██║   ██║
╚════██║██╔══██╗██║   ██║██║╚██╗██║██║╚════██║██║   ██║
███████║██████╔╝╚██████╔╝██║ ╚████║██║███████║╚██████╔╝
╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════╝ ╚═════╝ 
         ╚███████╗ █████╗ ███╗   ███╗ █████╗ 
         ╚══███╔═╝██╔══██╗████╗ ████║██╔══██╗
           ███╔╝  ███████║██╔████╔██║███████║
          ███╔╝   ██╔══██║██║╚██╔╝██║██╔══██║
         ███████╗ ██║  ██║██║ ╚═╝ ██║██║  ██║
         ╚══════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
`}
          </pre>
        </div>
        <p className="text-terminal-cyan mb-2 text-center">
          Welcome to my portfolio terminal!
        </p>
        <p className="mb-2 text-center">
          Systems & Backend Engineer
        </p>
        <p className="mb-4 text-center">
          Type{" "}
          <span className="text-terminal-yellow">'help'</span>{" "}
          to see available commands.
        </p>
      </div>
    );

    setCommandHistory([
      {
        command: "",
        output: welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus input on click
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener("click", handleClick);
    return () =>
      document.removeEventListener("click", handleClick);
  }, []);

  // Update suggestions based on input
  useEffect(() => {
    if (currentInput.trim()) {
      const matches = allCommands.filter(
        (cmd) =>
          cmd.toLowerCase().startsWith(currentInput.toLowerCase()) &&
          cmd.toLowerCase() !== currentInput.toLowerCase(),
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  const projects = [
    {
      name: "Adaptive Task Orchestrator",
      file: "task_orchestrator.txt",
      stack: "Python, Redis, Docker",
      type: "Distributed Systems",
      description:
        "Designed and implemented a system to intelligently schedule and prioritize computational tasks across multiple services, simulating a production environment with variable loads and dependencies to demonstrate reliability and throughput optimization.",
      features: [
        "Intelligent task scheduling",
        "Priority-based queue management",
        "Load balancing across services",
        "Dependency resolution",
        "Throughput optimization",
        "Simulated production workloads",
      ],
      github: "https://github.com/sbonisozama/adaptive-task-orchestrator",
    },
    {
      name: "Real-Time Event Correlation Engine",
      file: "event_correlation.txt",
      stack: "Python, Kafka, Elasticsearch",
      type: "Event Processing & Monitoring",
      description:
        "Built a platform that ingests multiple streams of operational data and identifies correlated events in real time, simulating enterprise-scale monitoring systems with mock data streams and automated alert mechanisms.",
      features: [
        "Multi-stream data ingestion",
        "Real-time correlation algorithms",
        "Pattern detection & anomaly alerts",
        "Enterprise-scale simulation",
        "Automated alerting system",
        "Mock data stream generation",
      ],
      github: "https://github.com/sbonisozama/event-correlation-engine",
    },
    {
      name: "Context-Aware API Gateway",
      file: "api_gateway.txt",
      stack: "Go, Redis, Prometheus",
      type: "API Infrastructure",
      description:
        "Delivered a smart API gateway that dynamically routes, throttles, and transforms requests based on traffic patterns, user behavior, and security policies, simulating a production-like environment with multiple client scenarios and monitoring dashboards.",
      features: [
        "Dynamic routing logic",
        "Intelligent rate limiting",
        "Request transformation",
        "Traffic pattern analysis",
        "Security policy enforcement",
        "Real-time monitoring dashboards",
      ],
      github: "https://github.com/sbonisozama/context-aware-gateway",
    },
    {
      name: "Intelligent Log Analysis Platform",
      file: "log_analysis.txt",
      stack: "Python, Elasticsearch, ML",
      type: "System Monitoring & Analytics",
      description:
        "Developed a platform that categorizes and prioritizes logs, detects anomalies, and suggests potential root causes, using simulated log sources and anomaly conditions to replicate responsibilities typically handled by backend/system engineers.",
      features: [
        "Automated log categorization",
        "Anomaly detection algorithms",
        "Root cause analysis",
        "Priority scoring system",
        "Simulated log generation",
        "ML-based pattern recognition",
      ],
      github: "https://github.com/sbonisozama/intelligent-log-platform",
    },
    {
      name: "Modular Simulation of Distributed Systems",
      file: "distributed_sim.txt",
      stack: "Python, Docker, Grafana",
      type: "Systems Simulation & Testing",
      description:
        "Created a simulator modeling distributed systems, network latencies, and failure scenarios, using simulated nodes and failure events to test resilience and algorithm performance, replicating enterprise-level systems analysis.",
      features: [
        "Distributed system modeling",
        "Network latency simulation",
        "Failure scenario testing",
        "Resilience algorithms",
        "Performance benchmarking",
        "Enterprise-scale replication",
      ],
      github: "https://github.com/sbonisozama/distributed-system-sim",
    },
  ];

  const executeCommand = (cmd: string) => {
    let trimmedCmd = cmd.trim().toLowerCase();
    let output: JSX.Element | string = "";

    if (trimmedCmd === "") {
      return;
    }

    // Check for command aliases
    if (commandAliases[trimmedCmd]) {
      trimmedCmd = commandAliases[trimmedCmd];
    }

    playEnterSound(soundEnabled);

    // Check for cat command
    if (trimmedCmd.startsWith("cat ")) {
      const fileName = trimmedCmd.substring(4).trim();
      const project = projects.find(
        (p) =>
          p.file === fileName ||
          p.name.toLowerCase() === fileName,
      );

      if (project) {
        output = (
          <div className="fade-in">
            <div className="border border-terminal-green p-4 my-2 rounded">
              <p className="text-terminal-cyan mb-2">
                ╔═══ {project.name} ═══╗
              </p>
              <p className="mb-2">
                <span className="text-terminal-yellow">
                  Stack:
                </span>{" "}
                {project.stack}
              </p>
              <p className="mb-2">
                <span className="text-terminal-yellow">
                  Type:
                </span>{" "}
                {project.type}
              </p>
              <p className="mb-3">{project.description}</p>

              <p className="text-terminal-yellow mb-1">
                Features:
              </p>
              <ul className="list-none pl-4 mb-4">
                {project.features.map((feature, idx) => (
                  <li key={idx}>▸ {feature}</li>
                ))}
              </ul>

              {/* GitHub Repository Section */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <p className="text-terminal-cyan mb-2">
                  <span className="text-terminal-yellow">
                    📦 Repository:
                  </span>
                </p>

                <div className="bg-gray-900 border border-gray-700 rounded p-3 space-y-2">
                  {/* GitHub Link */}
                  <div className="flex items-center justify-between">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-cyan underline hover:text-terminal-green transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>🔗</span>
                      <span className="break-all">
                        {project.github}
                      </span>
                    </a>
                  </div>

                  {/* Git Clone Command */}
                  <div className="border-t border-gray-800 pt-2">
                    <p className="text-gray-400 text-sm mb-1">
                      Clone repository:
                    </p>
                    <div className="flex items-center gap-2 bg-black border border-gray-800 rounded p-2">
                      <span className="text-terminal-green text-sm">
                        $
                      </span>
                      <code className="text-sm flex-1 text-white break-all">
                        git clone {project.github}.git
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            `git clone ${project.github}.git`,
                          );
                          const notification =
                            document.createElement("div");
                          notification.textContent =
                            "✓ Copied!";
                          notification.className =
                            "fixed top-4 right-4 bg-terminal-green text-black px-4 py-2 rounded shadow-lg z-50";
                          document.body.appendChild(
                            notification,
                          );
                          setTimeout(
                            () => notification.remove(),
                            2000,
                          );
                        }}
                        className="text-terminal-yellow hover:text-terminal-cyan transition-colors text-xs px-2 py-1 border border-gray-700 rounded hover:border-terminal-cyan whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="border-t border-gray-800 pt-2">
                    <p className="text-gray-400 text-sm mb-1">
                      Quick actions:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, "_blank");
                        }}
                        className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-terminal-green text-terminal-green rounded transition-colors"
                      >
                        View on GitHub
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `${project.github}/issues`,
                            "_blank",
                          );
                        }}
                        className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-terminal-cyan text-terminal-cyan rounded transition-colors"
                      >
                        Issues
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `${project.github}/fork`,
                            "_blank",
                          );
                        }}
                        className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-terminal-yellow text-terminal-yellow rounded transition-colors"
                      >
                        Fork
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        playErrorSound(soundEnabled);
        output = (
          <p className="text-terminal-red">
            cat: {fileName}: No such file or directory
          </p>
        );
      }
    } else {
      switch (trimmedCmd) {
        case "help":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-2">
                Available commands:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 pl-4">
                <div>
                  <p>
                    <span className="text-terminal-yellow">
                      help
                    </span>{" "}
                    - Display this help message
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      about
                    </span>{" "}
                    - Learn more about me
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      whoami
                    </span>{" "}
                    - Quick personal info
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      skills
                    </span>{" "}
                    - View my technical skills
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      projects
                    </span>{" "}
                    - List all projects (alias: ls)
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-terminal-yellow">
                      cat &lt;project&gt;
                    </span>{" "}
                    - View project details
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      contact
                    </span>{" "}
                    - Get in touch
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      sound
                    </span>{" "}
                    - Toggle sound effects
                  </p>
                  <p>
                    <span className="text-terminal-yellow">
                      clear
                    </span>{" "}
                    - Clear the terminal
                  </p>
                  <p className="text-gray-500 mt-2">
                    Easter eggs: cowsay, matrix, hack, coffee,
                    sudo su
                  </p>
                </div>
              </div>
            </div>
          );
          break;

        case "whoami":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-2">
                $ whoami
              </p>
              <div className="border border-terminal-green p-4 rounded">
                <pre className="text-terminal-green">
                  {`
   _____  _                 _           
  / ____|| |               (_)          
 | (___  | |__    ___  _ __  _  ___  ___  
  \\___ \\ | '_ \\  / _ \\| '_ \\| |/ __|/ _ \\ 
  ____) || |_) || (_) | | | | |\\__ \\ (_) |
 |_____/ |_.__/  \\___/|_| |_|_||___/\\___/ 
                                          
  _____                           
 |__  /  __ _  _ __ ___    __ _   
   / /  / _\` || '_ \` _ \\  / _\` |  
  / /_ | (_| || | | | | || (_| |  
 /____| \\__,_||_| |_| |_| \\__,_|  
`}
                </pre>
                <p className="mt-3 text-terminal-yellow">
                  Current User:
                </p>
                <p className="ml-4">• Name: Sboniso Zama</p>
                <p className="ml-4">
                  • Role: Systems & Backend Engineer
                </p>
                <p className="ml-4">
                  • Status: Building cool stuff 🚀
                </p>
                <p className="ml-4">
                  • Location: /home/sboniso/portfolio
                </p>
                <p className="mt-3 text-gray-400 italic">
                  Passionate about systems, backend
                  architectures, and intelligent software design.
                </p>
              </div>
            </div>
          );
          break;

        case "about":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-2">
                $ cat about_me.txt
              </p>
              <div className="border border-terminal-green p-4 rounded">
                <p className="mb-2">
                  <span className="text-terminal-yellow">
                    Name:
                  </span>{" "}
                  Sboniso Zama
                </p>
                <p className="mb-2">
                  <span className="text-terminal-yellow">
                    Role:
                  </span>{" "}
                  Systems & Backend Engineer
                </p>
                <p className="mb-2">
                  <span className="text-terminal-yellow">
                    Focus:
                  </span>{" "}
                  C++, Python, Linux, Backend Architectures
                </p>
                <p className="mt-4">
                  I am a Systems and Backend Engineer with a
                  strong foundation in C++, Python, Linux, and
                  modern backend architectures, driven by a
                  passion for understanding and designing
                  intelligent, scalable software systems. My work
                  focuses on creating clean, conceptual, and
                  forward-thinking projects that simulate
                  real-world enterprise environments, allowing me
                  to develop practical expertise while exploring
                  complex system interactions.
                </p>
                <p className="mt-3 text-terminal-cyan">
                  Core Philosophy:
                </p>
                <p className="ml-4 italic">
                  "Build systems that are clean, conceptual, and
                  forward-thinking. Simulate complexity to
                  understand it, then design solutions that
                  scale."
                </p>
              </div>
            </div>
          );
          break;

        case "skills":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-2">
                $ ls ~/skills/
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-terminal-green p-3 rounded">
                  <p className="text-terminal-yellow mb-2">
                    Programming Languages
                  </p>
                  <ul className="list-none pl-2">
                    <li>▸ C++</li>
                    <li>▸ Python</li>
                    <li>▸ JavaScript (Node.js, React)</li>
                  </ul>
                </div>
                <div className="border border-terminal-green p-3 rounded">
                  <p className="text-terminal-yellow mb-2">
                    Systems & OS
                  </p>
                  <ul className="list-none pl-2">
                    <li>
                      ▸ Linux (scripting, monitoring, automation)
                    </li>
                    <li>▸ Command-line tools</li>
                    <li>▸ Process management</li>
                    <li>▸ System orchestration</li>
                  </ul>
                </div>
                <div className="border border-terminal-green p-3 rounded">
                  <p className="text-terminal-yellow mb-2">
                    Backend & Web Development
                  </p>
                  <ul className="list-none pl-2">
                    <li>▸ RESTful APIs</li>
                    <li>▸ Microservices</li>
                    <li>▸ API Gateways</li>
                    <li>▸ PostgreSQL, MongoDB, Redis</li>
                    <li>▸ Docker & containerization</li>
                    <li>▸ CI/CD principles</li>
                  </ul>
                </div>
                <div className="border border-terminal-green p-3 rounded">
                  <p className="text-terminal-yellow mb-2">
                    Security & Networking
                  </p>
                  <ul className="list-none pl-2">
                    <li>▸ Authentication & Authorization</li>
                    <li>▸ JWT, OAuth2</li>
                    <li>▸ Network concepts</li>
                    <li>▸ Packet analysis</li>
                    <li>▸ Secure system design</li>
                  </ul>
                </div>
              </div>
            </div>
          );
          break;

        case "projects":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-3">
                $ ls -la ~/projects/
              </p>
              <p className="text-gray-400 mb-4">
                Displaying {projects.length} project templates...
              </p>

              <div className="space-y-4">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="border border-terminal-green p-4 rounded"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-terminal-cyan">
                        [{idx + 1}] {project.name}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {project.file}
                      </span>
                    </div>

                    <p className="mb-2">
                      <span className="text-terminal-yellow">
                        Stack:
                      </span>{" "}
                      {project.stack}
                    </p>

                    <p className="mb-2">
                      <span className="text-terminal-yellow">
                        Type:
                      </span>{" "}
                      {project.type}
                    </p>

                    <p className="mb-3 text-gray-300">
                      {project.description}
                    </p>

                    <div className="border-t border-gray-700 pt-2 mt-2">
                      <p className="text-terminal-yellow text-sm mb-1">
                        Key Features:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {project.features.map((feature, fIdx) => (
                          <p
                            key={fIdx}
                            className="text-sm text-gray-400"
                          >
                            <span className="text-terminal-green">
                              ▸
                            </span>{" "}
                            {feature}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-gray-400 text-sm">
                💡 Tip: Use{" "}
                <span className="text-terminal-yellow">
                  cat {projects[0].file}
                </span>{" "}
                to view individual project details
              </p>
            </div>
          );
          break;

        case "contact":
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan mb-2">
                $ cat contact.txt
              </p>
              <div className="border border-terminal-green p-4 rounded">
                <p className="mb-2">
                  <span className="text-terminal-yellow">
                    Email:
                  </span>{" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(
                        "sboniso.zama@example.com",
                      );
                      const notification =
                        document.createElement("div");
                      notification.textContent = "✓ Email copied!";
                      notification.className =
                        "fixed top-4 right-4 bg-terminal-green text-black px-4 py-2 rounded shadow-lg z-50";
                      document.body.appendChild(notification);
                      setTimeout(() => notification.remove(), 2000);
                    }}
                    className="underline hover:text-terminal-cyan transition-colors cursor-pointer"
                  >
                    sbonisozama0@gmail.com
                  </button>
                  <span className="text-gray-500 ml-2">
                    [click to copy]
                  </span>
                </p>
                <p className="mb-2">
                  <span className="text-terminal-yellow">
                    GitHub:
                  </span>{" "}
                  <a
                    href="https://github.com/SbonisoZama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-terminal-cyan transition-colors"
                  >
                    github.com/SbonisoZama
                  </a>
                </p>
              </div>
            </div>
          );
          break;

        case "sound":
          setSoundEnabled(!soundEnabled);
          output = (
            <div className="fade-in">
              <p className="text-terminal-cyan">
                🔊 Sound effects{" "}
                {!soundEnabled ? "enabled" : "disabled"}!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {!soundEnabled
                  ? "You will now hear keyboard sounds."
                  : "Sound effects muted."}
              </p>
            </div>
          );
          break;

        case "clear":
          setCommandHistory([]);
          return;

        // Easter Eggs
        case "cowsay":
          const cowMessages = [
            "Code is poetry",
            "Security first!",
            "Hello from the terminal",
            "Have you tried 'matrix'?",
            "Hack the planet!",
          ];
          const randomMsg =
            cowMessages[
              Math.floor(Math.random() * cowMessages.length)
            ];
          output = (
            <div className="fade-in">
              <pre className="text-terminal-green">
                {` _${Array(randomMsg.length).fill("_").join("")}_ 
< ${randomMsg} >
 -${Array(randomMsg.length).fill("-").join("")}- 
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
              </pre>
            </div>
          );
          break;

        case "matrix":
          output = (
            <div className="fade-in">
              <MatrixRain duration={5000} />
            </div>
          );
          break;

        case "hack":
          output = (
            <div className="fade-in">
              <div className="space-y-1">
                <p className="text-terminal-green">
                  Initializing hack sequence...
                </p>
                <p className="text-terminal-cyan">
                  Connecting to mainframe...{" "}
                  <span className="text-terminal-green">[OK]</span>
                </p>
                <p className="text-terminal-cyan">
                  Bypassing firewall...{" "}
                  <span className="text-terminal-green">[OK]</span>
                </p>
                <p className="text-terminal-cyan">
                  Cracking encryption...{" "}
                  <span className="text-terminal-green">[OK]</span>
                </p>
                <p className="text-terminal-cyan">
                  Downloading files...{" "}
                  <span className="text-terminal-green">[OK]</span>
                </p>
                <p className="text-terminal-yellow mt-2">
                  ████████████████████ 100%
                </p>
                <p className="text-terminal-green mt-2">
                  Access granted! You're in. 😎
                </p>
                <p className="text-gray-400 text-sm mt-2 italic">
                  Just kidding! This is a simulation. Real hacking
                  requires authorization.
                </p>
              </div>
            </div>
          );
          break;

        case "coffee":
          output = (
            <div className="fade-in">
              <pre className="text-terminal-yellow">
                {`
    (  )   (   )  )
     ) (   )  (  (
     ( )  (    ) )
     _____________
    <_____________> ___
    |             |/ _ \\
    |  COFFEE ☕  | | | |
    |_____________|_| |_|
`}
              </pre>
              <p className="text-terminal-cyan mt-2">
                Brewing a fresh cup of coffee...
              </p>
              <p className="text-gray-400 mt-1">
                Because no code is complete without caffeine! ☕
              </p>
            </div>
          );
          break;

        case "sudo su":
          output = (
            <div className="fade-in">
              <p className="text-terminal-green mb-2">
                [sudo] password for user: ********
              </p>
              <p className="text-terminal-cyan">
                Access granted. Welcome, root user. 🎉
              </p>
              <p className="mt-2">
                Just kidding! But I appreciate your curiosity. 😄
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Pro tip: With great power comes great
                responsibility.
              </p>
            </div>
          );
          break;

        default:
          playErrorSound(soundEnabled);
          output = (
            <p className="text-terminal-red">
              Command not found: {cmd}. Type 'help' for available
              commands.
            </p>
          );
      }
    }

    setCommandHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output,
        timestamp: Date.now(),
      },
    ]);
    setCurrentInput("");
    setHistoryIndex(-1);
    setSuggestions([]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const commands = commandHistory
        .filter((h) => h.command)
        .map((h) => h.command);
      if (commands.length > 0) {
        const newIndex =
          historyIndex < commands.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const commands = commandHistory
          .filter((h) => h.command)
          .map((h) => h.command);
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commands[commands.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentInput(e.target.value);
    if (soundEnabled && e.target.value.length > currentInput.length) {
      playKeystrokeSound(soundEnabled);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Terminal Header */}
        <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm hidden sm:inline">
              sboniso@portfolio:~$
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-gray-400 hover:text-terminal-green transition-colors text-sm px-2 py-1"
              title={soundEnabled ? "Sound On" : "Sound Off"}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
            <button
              onClick={() =>
                setShowMobileKeyboard(!showMobileKeyboard)
              }
              className="sm:hidden text-gray-400 hover:text-terminal-green transition-colors text-sm px-2 py-1"
              title="Toggle Mobile Keyboard"
            >
              ⌨️
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="bg-black border-2 border-gray-800 rounded-b-lg p-6 h-[70vh] overflow-y-auto"
        >
          {/* Command History */}
          {commandHistory.map((entry) => (
            <div key={entry.timestamp} className="mb-4">
              {entry.command && (
                <div className="flex items-center mb-2">
                  <span className="text-terminal-green">
                    user@sboniso
                  </span>
                  <span className="text-white">:</span>
                  <span className="text-terminal-cyan">~</span>
                  <span className="text-white">$ </span>
                  <span className="ml-2">{entry.command}</span>
                </div>
              )}
              <div className="pl-0">{entry.output}</div>
            </div>
          ))}

          {/* Current Input */}
          <div className="flex items-center relative">
            <span className="text-terminal-green">user@sboniso</span>
            <span className="text-white">:</span>
            <span className="text-terminal-cyan">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="ml-2 bg-transparent outline-none flex-1 text-white font-mono caret-terminal-green"
              autoFocus
              spellCheck={false}
            />
            <span className="blink ml-1 text-terminal-green">▊</span>

            {/* Autocomplete Dropdown */}
            <AutocompleteDropdown
              suggestions={suggestions}
              currentInput={currentInput}
              onSelect={(suggestion) => {
                setCurrentInput(suggestion);
                setSuggestions([]);
                inputRef.current?.focus();
              }}
            />
          </div>
        </div>

        {/* Quick Commands */}
        <div
          className={`mt-4 flex flex-wrap gap-2 justify-center ${showMobileKeyboard ? "block" : "hidden sm:flex"}`}
        >
          {["help", "about", "whoami", "skills", "projects", "contact"].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 border border-terminal-green text-terminal-green rounded transition-colors duration-200"
              >
                {cmd}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
