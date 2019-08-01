/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.XiangMuDetail;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface XiangMuDetailService {

    public XiangMuDetail getXiangMuDetailById(Integer id);
    
    public boolean changeXiangMuDetailState(Integer id, Integer state);
    
    public List<XiangMuDetail> getXiangMuDetailsByState(Integer state,Integer qy_id);
               
    public int queryRows(HashMap map);
    
    public List<XiangMuDetail> queryXiangMuDetailsByPage(HashMap map);

}
