import React from "https://dev.jspm.io/react@18.2.0";;
import History from './command/History.tsx';
import Input from './command/Input.tsx';
import useCommandHistory from '../hook/useCommandHistory.tsx';
import { Commands } from '../command/util.ts';
import Font from './common/FontTag.tsx';

const Terminal = ({
    commands,
    fontFamily,
    importGoogleFont = true,
    inputRef,
    containerRef,
    name,
    user,
}: Readonly<{
    commands: Commands;
    fontFamily: string;
    importGoogleFont?: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    name: string;
    user: string;
}>) => {
    const {
        history,
        commandsHistory,
        command,
        lastCommandIndex,
        setCommand,
        setHistory,
        clearHistory,
        setLastCommandIndex,
    } = useCommandHistory();

    React.useEffect(() => {
        const { banner } = commands;
        if (banner) {
            setHistory(banner(), commands);
        }
    }, []);

    React.useEffect(() => {
        const { current } = inputRef;
        if (current) {
            current.focus();
        }
    }, [history]);

    return (
        <div className="react-unix-terminal-terminal">
            <div
                ref={containerRef}
                className="react-unix-terminal-terminal-inner-container"
            >
                {importGoogleFont && <Font fontFamily={fontFamily} />}
                <History name={name} user={user} history={history} />
                <Input
                    name={name}
                    user={user}
                    commands={commands}
                    inputRef={inputRef}
                    containerRef={containerRef}
                    command={command}
                    commandsHistory={commandsHistory}
                    lastCommandIndex={lastCommandIndex}
                    setCommand={setCommand}
                    setHistory={setHistory}
                    setLastCommandIndex={setLastCommandIndex}
                    clearHistory={clearHistory}
                />
            </div>
        </div>
    );
};

export default Terminal;
