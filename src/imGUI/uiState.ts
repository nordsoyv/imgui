class UiState {
  public mouseX = 0
  public mouseY = 0;
  public mouseDown = false;
  public hotItem = 0;
  public activeItem = 0;
  public widgetState: any[] = [];
  public keyFocusItem = 0;
  public keyEntered = '';
  public keyShift = false;
  public keyCtrl =false;
  public keyAlt = false;

  public lastWidget = 0;
}


export const uiState = new UiState();
