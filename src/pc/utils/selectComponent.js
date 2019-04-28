export const handleChooseItem = ( item, config ) => {
    config.activeId = item.id;
    config.activeComponent = item.componentName;
    config.activeConfig = item.config;
}
export const getDefaultSelectComponent = ( list, config ) => {
    let item = list.find( ( item = {} ) => item.active === true );
    if ( !item ) {
        [ item ] = list;
    }
    handleChooseItem( item, config );
}
