import { Navigate } from 'react-router-dom';

/**
 * Legacy standalone DSL Studio route. The authoring flow now lives in the
 * Module Workspace wizard at /workspace/dsl. Keep this as a redirect so
 * existing bookmarks keep working.
 */
export function DslStudio() {
  return <Navigate to="/workspace/dsl" replace />;
}
