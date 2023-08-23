import React from 'react';

import { ImageIndex } from './styles';

interface BulletsProps {
  active?: boolean;
}

export function Bullets({ active = false }: BulletsProps) {
  return (
    <ImageIndex  active={active} />
  );
}