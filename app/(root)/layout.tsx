import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full min-h-screen"
      >
        <ResizablePanel
          defaultSize={20}
          maxSize={40}
          minSize={5}
          className="hidden lg:block"
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <Navbar />
          <ResizablePanelGroup direction="vertical">
            {children}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default Layout;
