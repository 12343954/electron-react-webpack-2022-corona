/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Controls - Close, Minimize, Maximize (Component)
 */

import classNames from 'classnames';
import React from 'react';
import context from '../titlebarContextApi';
import close from '@assets/images/menu/close.svg'

const WindowControls = (props) => {
  return (
    <section
      className={classNames(
        'window-titlebar-controls',
        `type-${props.platform}`,
      )}
    >
      <div
        className='control minimize'
        onClick={() => context.minimize()}
        title={props.tooltips ? 'Minimize' : null}
      >
        ─
      </div>
      <div
        className='control maximize'
        onClick={() => context.toggle_maximize()}
        title={props.tooltips ? 'Maximize' : null}
      >
        ☐
      </div>
      <div
        className='control close'
        onClick={() => context.exit()}
        title={props.tooltips ? 'Close' : null}
      >
        <img style={{ width: '20px', height: '20px' }} src={close} />
      </div>
    </section>
  );
};

export default WindowControls;
