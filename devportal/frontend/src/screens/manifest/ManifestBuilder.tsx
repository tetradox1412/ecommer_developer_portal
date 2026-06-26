import { Navigate } from 'react-router-dom';

/**
 * Legacy standalone Manifest Builder route. The authoring flow now lives in
 * the Module Workspace wizard at /workspace/manifest. Keep as a redirect.
 */
export function ManifestBuilder() {
  return <Navigate to="/workspace/manifest" replace />;
}
