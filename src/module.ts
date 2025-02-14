import { createBackendModule, coreServices} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint  } from '@backstage/plugin-scaffolder-node/alpha';
import { createFetchCopierAction } from './actions/fetch';
import { ScmIntegrations } from '@backstage/integration';

export const scaffolderModule = createBackendModule({
  moduleId: 'fetch-copier',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
        reader: coreServices.urlReader,
      },
      async init({ scaffolderActions, config, reader }) {
        const integrations = ScmIntegrations.fromConfig(config);
        scaffolderActions.addActions(createFetchCopierAction( { reader, integrations } ));
      }
    });
  },
})
