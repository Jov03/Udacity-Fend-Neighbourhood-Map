import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

const drawerWidth = 300;
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  search: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(1,1,1,0.1)"
  },
  searchIcon: {
    padding: "8px 16px"
  }
});

class Appdrawer extends Component {
  render() {
    const { classes, theme, searchResults } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                aria-label={'Search Box'}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={event =>
                  this.props.updateSearchQuery(event.target.value)
                }
              />
            </div>
          </ListItem>
          {searchResults.map((result, index) => (
            <ListItem
              button
              key={index}
              onClick={() => this.props.onSearchResClick(index)}
            >
              <ListItemText primary={result.title} />
            </ListItem>
          ))}
        </List>
        <Typography variant="caption" gutterBottom align="center">
          by Foursquare
        </Typography>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.props.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true,
              onBackdropClick: () => this.props.handleDrawerToggle()
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Appdrawer);
