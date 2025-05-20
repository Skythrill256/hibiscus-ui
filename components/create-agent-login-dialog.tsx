"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

interface CreateAgentLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // The parent will handle navigation after closing the dialog.
}

export const CreateAgentLoginDialog: React.FC<CreateAgentLoginDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onOpenChange(false); // Close the dialog
    router.push("/agents/create-login"); // Navigate
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">Login Required</DialogTitle>
          <DialogDescription className="mb-4">
            You need to log in to create a new agent. Please log in to continue.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full text-white font-semibold shadow-lg hover:from-pulse-600 hover:to-pulse-800 transition-all duration-200 py-3 rounded-xl text-base flex items-center justify-center gap-2"
          onClick={handleLoginRedirect} // Use the internal redirect handler
        >
          <User className="h-5 w-5 text-white" />
          Login
        </Button>
      </DialogContent>
    </Dialog>
  );
}; 